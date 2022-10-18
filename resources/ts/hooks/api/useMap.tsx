import axios from "axios";
import { useContext, useState } from "react";
import { DataTableContext } from "../../providers/DataTableProvider";
import { SearchCriteriaContext } from "../../providers/SearchCriteriaProvider";
import { resultsType } from "../../types/SearchResults";
import { resultType } from "../../types/SearchResults";
import { useBinary } from "../useBinary";
import { useSort } from "../useSort";

export const useMap = () => {

    const {
        distanceCriteria, 
        extractOnlyIsOpen,
        keyword,
        ratingsTotalCriteria,
        location,
        radiusCriteria,
        rateCriteria,
        setResults
    } = useContext(SearchCriteriaContext);
    const { setIsLoading } = useContext(DataTableContext);

    const { sort } = useSort();
    const { convBase64 } = useBinary();


    //ある地点の緯度、経度の値が格納される連想配列の型
    type Location = {
        lat:number;
        lng:number;
    }


    // 現在の位置情報を取得する関数、処理は非同期
    //引数：無し。
    //返却：Promiseオブジェクト
    //resolve：{ lat: 緯度, lng: 経度 }
    //reject：無し。呼び出し先でアラート表示
    const getPosition = () => {
        return new Promise((resolve:(value:Location) => void, reject) => {

            // Geolocation APIに対応していない場合の処理
            if (!navigator.geolocation) {
                reject({message: 'geolocationAPIが利用できません。'});
            };

            //オプション指定
            const options = {
                //可能な場合、より精度の高い情報を取得する
                enableHighAccuracy : true
            };

            //現在地取得
            navigator.geolocation.getCurrentPosition((position) => {
                let latLng:Location = {
                    lat :position.coords.latitude,
                    lng: position.coords.longitude
                };

                resolve(latLng);
            },(error) => {
                //取得に失敗した場合のエラーログの出し分け
                switch(error.code) {
                    case 1: //PERMISSION_DENIED
                        console.log("error:位置情報の利用が許可されていません");
                        break;
                    case 2: //POSITION_UNAVAILABLE
                        console.log(" error:現在位置が取得できませんでした");
                        break;
                    case 3: //TIMEOUT
                        console.log("error:タイムアウトになりました");
                        break;
                    default:
                        console.log("位置情報取得中に原因不明のエラーが発生しました。(エラーコード:"+error.code+")");
                        break;
                };
                reject({message: '現在地を取得することが出来ません。'});
            },options);
        });
    };


    
    
    //指定された検索地点の位置情報を取得する非同期関数
    //引数：無し。
    //return：検索地点の緯度、経度が格納された連想配列。
    //throw：エラーメッセージが格納された連想配列。
    const getDesignatedLocation = async () => {
        //最終的に返却する変数
        let geometry = {
            lat: 0,
            lng: 0
        }

        //Laravelに外部APIを呼び出してもらい、結果をReactが受け取る
        const request = {
            keyword: location
        }
        await axios.post('/api/geometry',request).then(res => {
            const status = res.data.status;
            if( status == 'OK') {
                geometry = res.data.candidates[0].geometry.location;
            } else {
                switch(status) {
                    case 'INVALID_REQUEST':
                        console.log('FindPlaceError:このリクエストは無効です。');
                        break;
                    case 'OVER_QUERY_LIMIT':
                        console.log('FindPlaceError:リクエストの利用制限回数を超えました。');
                        break;
                    case 'REQUEST_DENIED':
                        console.log('FindPlaceError:サービスが利用できない状況でした。');
                        break;
                    case 'UNKNOWN_ERROR':
                        console.log('FindPlaceError:サーバ接続に失敗しました。');
                        break;
                    case 'ZERO_RESULTS':
                        console.log('FindPlaceError:検索結果が０件です。');
                        break;
                }
            }
        }).catch(() => {
            throw({message: '位置情報の取得に失敗しました。'});
        });
        return(geometry);
    }






    //2地点間の直線距離を求める関数
    //第一引数：緯度（1地点目）, 第二引数：経度（1地点目）
    //第三引数：緯度（2地点目）, 第四引数：経度（2地点目）
    //返却：2地点間の直線距離（㎞）
    const calcDistance = (
        lat1:number, 
        lng1:number, 
        lat2:number, 
        lng2:number
        ) => {

        const R = Math.PI / 180;
        lat1 *= R;
        lng1 *= R;
        lat2 *= R;
        lng2 *= R;

        return 6371 * Math.acos(Math.cos(lat1) * Math.cos(lat2) * Math.cos(lng2 - lng1) + Math.sin(lat1) * Math.sin(lat2));
    };



    //APIから取得した施設情報を比較しやすい形の連想配列にする関数
    //関数内に非同期処理を含むため非同期関数となっている。
    //第一引数：APIから取得したデータ
    //返却：Promiseオブジェクト。
    //then：比較しやすい形に変換された連想配列。型は「resultsType」
    //catch：呼び出し先でアラート表示
    const createData = (
        dataList: any,
        originLocation: Location
        ) => {

        //最終的に返却する値（この時点では空配列）
        let establishmentsData:resultsType= [];



        //最終的に返却される値の中身をつくっていく
        for(let data of dataList) {

            //返却される値「establishmentsData」の要素となる
            //「establishmentData」を作成
            let establishmentData:resultType = {
                id: 0,
                name:'',
                rating:0,
                distance:0,
                userRatingsTotal:0,
                sumRank:0,
                rank: dataList.length,
                originLocation: {
                    lat: undefined,
                    lng: undefined
                },
                destinationPlaceId:'',
                photoReference: '',
                photoAttribution: ''
            };

            //データに固有の番号をふる(map関数のkeyに渡す用)
            establishmentData.id = dataList.indexOf(data);

            establishmentData.name = data.name ? data.name : '' ;
            establishmentData.rating = data.rating ? data.rating : 0;
            establishmentData.userRatingsTotal = data.user_ratings_total
                                                ? data.user_ratings_total
                                                : 0 ;

            establishmentData.originLocation = originLocation;
            establishmentData.destinationPlaceId = data.place_id
                                                ? data.place_id
                                                : '';
            establishmentData.photoReference = data.photos
                                    ? data.photos[0].photo_reference
                                    : '';
            if(data.photos && data.photos[0].html_attributions){
                establishmentData.photoAttribution = data.photos[0].html_attributions[0];
            } ;
            if(data.geometry && data.geometry.location){
                //calcDistanceで取得される値は直線距離のため、
                //日本の道直比の平均値である1.3を掛ける。
                establishmentData.distance = Math.round((calcDistance(
                    originLocation.lat, 
                    originLocation.lng, 
                    data.geometry.location.lat, 
                    data.geometry.location.lng
                ) * 1.3) * 10) / 10;
            };
            
            establishmentsData.push(establishmentData);
        };

        return establishmentsData;

    };


    //GooglMaps PlacesApiを用いて施設情報を取得
    //関数内でデータの取得、整形を行い、グローバルState「results」を更新する
    //引数：無し。
    //返却：無し。（関数内でStateの更新まで行うため）
    const getEstablishmentsData = async () => {
        //ローディングを開始
        setIsLoading(true);


        //検索地点の値に合わせて緯度・経度を取得
        let originLocation:{lat : number, lng:number} = {
            lat:0,
            lng:0
        }

        if( location == '現在地') {
            await getPosition().then(( value ) => {
                originLocation.lat = value.lat;
                originLocation.lng = value.lng;
            }).catch((error) => {
                throw(error);
            });
        } else {
            //指定された検索地点の位置情報を取得
            await getDesignatedLocation().then(( value ) => {
                originLocation.lat = value.lat;
                originLocation.lng = value.lng;
            }).catch((error) => {
                throw(error);
            });
        };


        const request = {
            //検索キーワードの値が入る
            keyword: keyword,
            //指定した検索地点
            lat: originLocation.lat,
            lng: originLocation.lng,
            //検索範囲の値が入る
            radius: String(radiusCriteria),
            //「現在営業中の施設のみ表示」の値が入る
            openNow: extractOnlyIsOpen,
        };

        await axios.post('/api/search', request).then(res => {
            const status = res.data.status;
            if(status == 'OK') {
                let data = res.data.results;
                
                data = createData(data, originLocation);
                sort(data, rateCriteria, ratingsTotalCriteria, distanceCriteria);
                setResults(data);
                setIsLoading(false);
            } else {
                setIsLoading(false);
                switch (status) {
                    case 'INVALID_REQUEST':
                        throw('リクエストが無効です。');
                        break;
                    case 'OVER_QUERY_LIMIT':
                        throw('リクエストの利用制限回数を超過しました。');
                        break;
                    case 'REQUEST_DENIED':
                        throw('サービスが利用できない状況です。');
                        break;
                    case 'UNKNOWN_ERROR':
                        throw('サーバ接続に失敗しました。');
                        break;
                    case 'ZERO_RESULTS':
                        throw('検索結果が０件です。');
                        break;
                }
            }
        }).catch((e) => {
            throw({message: e});
        });
    }

    const getPlacePhoto = async (reference: string) => {
        const data = {
            reference
        }
        let photo:string = '';

        await axios({
            method: 'POST',
            url: 'api/photo',
            data,
            responseType: 'arraybuffer'
        }).then(res => {
            photo = convBase64(res.data);
        }).catch(e => {
            throw({message: '一部施設の画像の取得に失敗しました。'});
        });
        return photo;
    }

    return { getEstablishmentsData, getPlacePhoto }
}