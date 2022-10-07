import {resultsType} from "../types/SearchResults";

export const useSort = () => {


        //レビュー評価を小さい順にソートした配列を生成する関数
        const sortByReviewAsc = (results:resultsType) => {
            return(
                results.slice().sort((a,b) => {
                    if (a.rating > b.rating) {
                        return 1;
                    } else if (a.rating < b.rating) {
                        return -1;
                    } else {
                        return 0;
                    }
                })
            );
        } 
    
        //レビュー評価を大きい順にソートした配列を生成する関数
        const sortByReviewDesc = (results:resultsType) => {
            return(
                results.slice().sort((a,b) => {
                    if (a.rating < b.rating) {
                        return 1;
                    } else if (a.rating > b.rating) {
                        return -1;
                    } else {
                        return 0;
                    }
                })
            );
        } 
    
        //距離を小さい順にソートした配列を生成する関数
        const sortByDistanceAsc = (results:resultsType) => {
            return(
                results.slice().sort((a,b) => {
                    if (a.distance > b.distance) {
                        return 1;
                    } else if (a.distance < b.distance) {
                        return -1;
                    } else {
                        return 0;
                    }
                })
            );
        } 
    
        //距離を大きい順にソートした配列を生成する関数
        const sortByDistanceDesc = (results:resultsType) => {
            return(
                results.slice().sort((a,b) => {
                    if (a.distance < b.distance) {
                        return 1;
                    } else if (a.distance > b.distance) {
                        return -1;
                    } else {
                        return 0;
                    }
                })
            );
        } 
        
    
        //母数を少ない順にソートした配列を生成する関数
        const sortByParameterAsc = (results:resultsType) => {
            return(
                results.slice().sort((a,b) => {
                    if (a.userRatingsTotal > b.userRatingsTotal) {
                        return 1;
                    } else if (a.userRatingsTotal < b.userRatingsTotal) {
                        return -1;
                    } else {
                        return 0;
                    }
                })
            );
        } 
    
        //母数を多い順にソートした配列を生成する関数
        const sortByParameterDesc = (results:resultsType) => {
            return(
                results.slice().sort((a,b) => {
                    if (a.userRatingsTotal < b.userRatingsTotal) {
                        return 1;
                    } else if (a.userRatingsTotal > b.userRatingsTotal) {
                        return -1;
                    } else {
                        return 0;
                    }
                })
            );
        }


    //検索条件に基づいてソート出来る関数
    const sort = (results:resultsType, review:string, parameter:string, distance:string) => {
        const resultsData = results;
        console.log('入ってきたデータ')
        console.log(resultsData);

        let resultsByReview: resultsType = resultsData;
        let resultsByParameter: resultsType = resultsData;
        let resultsByDistance: resultsType = resultsData;
        
        //それぞれの検索条件ごとにデータをソートした連想配列
        //「resultsByReview」「resultsByParameter」「resultsByDistance」を作成
        if ( review == 'heigh'){
            resultsByReview = sortByReviewDesc(resultsData);
            if ( parameter == 'many' ) {
                resultsByParameter = sortByParameterDesc(resultsData);
                switch ( distance ) {
                    case 'near':
                        resultsByDistance = sortByDistanceAsc(resultsData);
                    break;
                    case 'far':
                        resultsByDistance = sortByDistanceDesc(resultsData);
                    break;
                }
            } else if ( parameter == 'few' ) {
                resultsByParameter = sortByParameterAsc(resultsData);
                switch ( distance ) {
                    case 'near':
                        resultsByDistance = sortByDistanceAsc(resultsData);
                    break;
                    case 'far':
                        resultsByDistance = sortByDistanceDesc(resultsData);
                    break;
                }
            } else {
                switch ( distance ) {
                    case 'near':
                        resultsByDistance = sortByDistanceAsc(resultsData);
                    break;
                    case 'far':
                        resultsByDistance = sortByDistanceDesc(resultsData);
                    break;
                }
            }
        } else if ( review == 'low' ) {
            resultsByReview = sortByReviewAsc(resultsData);
            if ( parameter == 'many' ) {
                resultsByParameter = sortByParameterDesc(resultsData);
                switch ( distance ) {
                    case 'near':
                        resultsByDistance = sortByDistanceAsc(resultsData);
                    break;
                    case 'far':
                        resultsByDistance = sortByDistanceDesc(resultsData);
                    break;
                }
            } else if ( parameter == 'few' ) {
                resultsByParameter = sortByParameterAsc(resultsData);
                switch ( distance ) {
                    case 'near':
                        resultsByDistance = sortByDistanceAsc(resultsData);
                    break;
                    case 'far':
                        resultsByDistance = sortByDistanceDesc(resultsData);
                    break;
                }
            } else {
                switch ( distance ) {
                    case 'near':
                        resultsByDistance = sortByDistanceAsc(resultsData);
                    break;
                    case 'far':
                        resultsByDistance = sortByDistanceDesc(resultsData);
                    break;
                }
            }
        } else {
            if ( parameter == 'many' ) {
                resultsByParameter = sortByParameterDesc(resultsData);
                switch ( distance ) {
                    case 'near':
                        resultsByDistance = sortByDistanceAsc(resultsData);
                    break;
                    case 'far':
                        resultsByDistance = sortByDistanceDesc(resultsData);
                    break;
                }
            } else if ( parameter == 'few' ) {
                resultsByParameter = sortByParameterAsc(resultsData);
                switch ( distance ) {
                    case 'near':
                        resultsByDistance = sortByDistanceAsc(resultsData);
                    break;
                    case 'far':
                        resultsByDistance = sortByDistanceDesc(resultsData);
                    break;
                }
            } else {
                switch ( distance ) {
                    case 'near':
                        resultsByDistance = sortByDistanceAsc(resultsData);
                    break;
                    case 'far':
                        resultsByDistance = sortByDistanceDesc(resultsData);
                    break;
                }
            }
        }



        // それぞれのデータの各規準における順位が格納された配列を要素にもつ、
        // 二次元配列「indexNumbersByCriteria」を作成
        let indexNumbersByCriteria:number[][]= []

        for (let i = 0; i < results.length; i++) {
            const indexNumber:number[] = []
            if(review != 'unspecified'){
                indexNumber.push(resultsByReview?.indexOf(resultsData[i]));
            } else {
                indexNumber.push(0)
            }

            if(parameter != 'unspecified') {
                indexNumber.push(resultsByParameter?.indexOf(resultsData[i]));
            } else {
                indexNumber.push(0)
            }

            if(distance != 'unspecified') {
                indexNumber.push(resultsByDistance?.indexOf(resultsData[i]));
            } else {
                indexNumber.push(0)
            }
            indexNumbersByCriteria.push(indexNumber);
        }

        
        // 同じ値であるデータに同じ順位をつける処理
        for (let i = 1; i< results.length + 1; i++) {
            if(resultsByReview[i] && resultsByParameter[i] && resultsByDistance[i]){
                
                if ( resultsByReview[i].rating == resultsByReview[i-1].rating ) {
                    //ratingの値が同じであった2つのデータのIDを取得
                    //ratingを基準にソートした配列でインデックス番号が小さい方のデータのIDを「id1」
                    //インデックス番号が大きいほうのデータのIDを「id2」に入れる
                    let id1 = resultsByReview[i-1].id;
                    let id2 = resultsByReview[i].id;

                    //「id1」「id2」がそれぞれデータがわたってきた段階でどこにインデックスされていたのかを特定する
                    let index1 = resultsData.findIndex(({id}) => id === id1);
                    let index2 = resultsData.findIndex(({id}) => id === id2);

                    //各規準における順位が格納された二次元配列「indexNumberByCriteria」の順位の値を同じ値にそろえる
                    indexNumbersByCriteria[index2][0] = indexNumbersByCriteria[index1][0]
                }
                if ( resultsByParameter[i].userRatingsTotal == resultsByParameter[i-1].userRatingsTotal ) {
                    let id1 = resultsByParameter[i-1].id;
                    let id2 = resultsByParameter[i].id;

                    let index1 = resultsData.findIndex(({id}) => id === id1);
                    let index2 = resultsData.findIndex(({id}) => id === id2);

                    indexNumbersByCriteria[index2][1] = indexNumbersByCriteria[index1][1]
                }
                if ( resultsByDistance[i].distance == resultsByDistance[i-1].distance ) {
                    let id1 = resultsByDistance[i-1].id;
                    let id2 = resultsByDistance[i].id;

                    let index1 = resultsData.findIndex(({id}) => id === id1);
                    let index2 = resultsData.findIndex(({id}) => id === id2);

                    indexNumbersByCriteria[index2][2] = indexNumbersByCriteria[index1][2]
                }
            }
        }


        //インデックス番号 ＝id - 1となる、それぞれのデータの順位の合計が格納される配列
        // 「sumIndexes」を作成
        let sumIndexes:Array<number> = []

        for (let indexNumbers of indexNumbersByCriteria) {
            let sumIndexNumbers = 0
            for(let indexNumber of indexNumbers) {
                sumIndexNumbers = sumIndexNumbers + indexNumber!
            }
            sumIndexes.push(sumIndexNumbers)
        }
        


        //「results」内のそれぞれのデータの「sumRank」の値を更新
        for(let i= 0; i < results.length; i++) {
            results[i].sumRank = sumIndexes[i]
        }


        //更新された「sumRank」の値で「results」を昇順にソート
        results.sort((a,b) => {
            if (a.sumRank < b.sumRank) {
                return -1;
            } else if (a.sumRank > b.sumRank) {
                return 1;
            } else {
                return 0;
            }
        })

        //最終的な順位が格納されるresult.rankを更新
        for ( let result of results ) {
            let index = results.indexOf(result);
            result.rank = index + 1;
            if ( index > 0 ) {
                const previousElement = results[index -1];
                if ( previousElement.sumRank ==  result.sumRank ) {
                    result.rank = previousElement.rank;
                };
            };
        };

        console.log('最終的にソートされたデータ')
        console.log(results)
        return{results}

    }

    return { sort }

}