import axios from "axios";
import { useContext, useState } from "react";
import { DataTableContext } from "../../providers/DataTableProvider";
import { SearchCriteriaContext } from "../../providers/SearchCriteriaProvider";
import { resultsType } from "../../types/SearchResults";
import { resultType } from "../../types/SearchResults";
import { useAlert } from "../useAlert";
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
    const { changeAlertStatus } = useAlert();


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
                changeAlertStatus(
                    true,
                    'geolocationAPIが利用出来ません。',
                    'error',
                    'bottom',
                    'center'
                );
                reject();
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
                reject();
            },options);
        });
    };




    //指定された検索地点の位置情報を取得する非同期関数
    //引数：無し。
    //返却：Promiseオブジェクト
    //resolve：検索地点の緯度、経度が格納された連想配列
    //reject：無し。呼び出し先でアラート表示。
    const getDesignatedLocation = () => {
        return new Promise( (resolve: (value:Location) => void, reject ) => {

            //最終的に返却する値
            let designatedLocation:Location = {
                lat: 0,
                lng: 0
            };

            //mapインスタンス生成

            let map = new google.maps.Map(
                document.createElement("div")
            );

            //placesServiceインスタンス生成
            let service = new google.maps.places.PlacesService(map);

            //requestの指定
            const request = {
                //検索したい文字列
                query: location,
                //取得したい情報を配列で表記する
                fields:['geometry']
            };
    
            service.findPlaceFromQuery( request, (
                results: google.maps.places.PlaceResult[] | null,
                status: google.maps.places.PlacesServiceStatus,
            ) => {
                console.log('findPlaceApi');
                if (status === google.maps.places.PlacesServiceStatus.OK){

                    if(results != null) {
                        if(results[0].geometry && results[0].geometry.location) {
                            designatedLocation.lat = results[0].geometry.location.lat();
                            designatedLocation.lng = results[0].geometry.location.lng();
                        };
                        resolve(designatedLocation);
                    };
                } else {
                    //エラー時のログ出し分け
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
                    reject();
                };
            });
        });
    };






    //2地点間の直線距離を求める関数
    //第一引数：緯度（1地点目）, 第二引数：経度（1地点目）
    //第一引数：緯度（2地点目）, 第二引数：経度（2地点目）
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
    const createData = async (
        dataList: google.maps.places.PlaceResult[],
        originLocation: Location
        ) => {

        //最終的に返却する値（この時点では空配列）
        let establishmentsData:resultsType= [];



        //最終的に返却される値の中身をつくっていく
        for(let data of dataList) {

            //返却される値「establishmentsData」の要素となる
            //「establishmentData」を作成
            let establishmentData:resultType = {
                id:undefined,
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
                photoUrl: '',
                photoAttribution: ''
            };

            //データに固有の番号をふる(ソートに使う用)
            establishmentData.id = dataList.indexOf(data) + 1;

            establishmentData.name = data.name ? data.name : '' ;
            establishmentData.rating = data.rating ? data.rating : 0;
            establishmentData.userRatingsTotal = data.user_ratings_total
                                                ? data.user_ratings_total
                                                : 0 ;

            establishmentData.originLocation = originLocation;
            establishmentData.destinationPlaceId = data.place_id
                                                ? data.place_id
                                                : '';
            establishmentData.photoUrl = data.photos
                                    ? data.photos[0].getUrl()
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
                    data.geometry.location.lat(), 
                    data.geometry.location.lng()
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

        //mapインスタンス生成
        let map = new google.maps.Map(
            document.createElement("div")
        );

        //placesServiceインスタンス生成
        let service = new google.maps.places.PlacesService(map);

        //取得結果が格納される変数
        let data:google.maps.places.PlaceResult[] = [];

        //検索地点の値に合わせて緯度・経度を取得
        let originLocation:{lat : number, lng:number} = {
            lat:0,
            lng:0
        }

        if( location == '現在地') {
            await getPosition().then(( value ) => {
                originLocation.lat = value.lat;
                originLocation.lng = value.lng;
            }).catch(() => {
                changeAlertStatus(
                    true,
                    '位置情報取得中に問題が発生しました。',
                    'error',
                    'bottom',
                    'center'
                );
            });
        } else {
            //指定された検索地点の位置情報を取得
            await getDesignatedLocation().then(( value ) => {
                originLocation.lat = value.lat;
                originLocation.lng = value.lng;
            }).catch(() => {
                changeAlertStatus(
                    true,
                    '位置情報取得中に問題が発生しました。',
                    'error',
                    'bottom',
                    'center'
                );
            });
        };


        //取得した緯度・経度からlocationを決定
        let gMapLocation:google.maps.LatLng = new google.maps.LatLng(originLocation.lat,originLocation.lng);


        const request = {
            //検索キーワードの値が入る
            keyword: keyword,
            //指定した検索地点
            location: gMapLocation,
            //検索範囲の値が入る
            radius: radiusCriteria,
            //「現在営業中の施設のみ表示」の値が入る
            openNow: extractOnlyIsOpen,
        };


        service.nearbySearch(request,
            (
                results: google.maps.places.PlaceResult[] | null,
                status: google.maps.places.PlacesServiceStatus,
                pagination: google.maps.places.PlaceSearchPagination | null,
            ) => {
                console.log('nearbySearchApi');
                switch(status) {
                    case 'OK':
                        {/*ー－－－－－－↓20件以上取得したい場合に必要な処理↓ー－－－－－ */}
                        // if (results != null) {
                        //     data = data.concat(results);
                        // };
                        //pagination.hasNextPage == true の場合は続きの情報アリ
                        //pagination.nextPageで続き情報取得
                        // if(pagination && pagination.hasNextPage) {
                        //     pagination.nextPage();
                        // } else {
                        // }
                        {/*ー－－－－－－－－－ー－－ここまでー－－－－－－－－－－－－ */}

                        //createDataは取得したデータをソートしやすい形に変換する関数
                        //Promiseオブジェクトを返す非同期関数
                        const createdData =  createData(results!, originLocation);
                        createdData.then((results:resultsType) => {
                            sort(results, rateCriteria, ratingsTotalCriteria, distanceCriteria);
                            setResults(results);
                            setIsLoading(false);
                        }).catch((e:any) => {
                            changeAlertStatus(
                                true,
                                '施設情報の取得に失敗しました。',
                                'error',
                                'bottom',
                                'center'
                            )
                        })
                        break;
                    case 'INVALID_REQUEST':
                        changeAlertStatus(
                            true,
                            'このリクエストは無効です。',
                            'error',
                            'bottom',
                            'center'
                        )
                        break;
                    case 'OVER_QUERY_LIMIT':
                        changeAlertStatus(
                            true,
                            'リクエストの利用制限回数を超えました。',
                            'error',
                            'bottom',
                            'center'
                        )
                        break;
                    case 'REQUEST_DENIED':
                        changeAlertStatus(
                            true,
                            'サービスが利用できない状況でした。',
                            'error',
                            'bottom',
                            'center'
                        )
                        break;
                    case 'UNKNOWN_ERROR':
                        changeAlertStatus(
                            true,
                            'サーバ接続に失敗しました。',
                            'error',
                            'bottom',
                            'center'
                        )
                        break;
                    case 'ZERO_RESULTS':
                        setIsLoading(false);
                        changeAlertStatus(
                            true,
                            '検索結果が０件です。',
                            'error',
                            'bottom',
                            'center'
                        )
                        break;
                }
            }
        )
    }

    return { getEstablishmentsData }
}