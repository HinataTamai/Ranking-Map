import {resultsType} from "../types/SearchResults";

export const useSort = () => {


    //レビュー評価、距離、評価総数のいずれかを基準としてソートする関数
    //第一引数：施設情報が格納された配列
    //第二引数：ソートの基準
    //第三引数：昇順か降順か
    //返却：ソートされた配列
    const sortDataListBy = (
        data:resultsType, 
        content: 'rating' | 'distance' | 'userRatingsTotal',
        order: 'asc' | 'desc'
        ) => {
        return(
            data.slice().sort((a,b) => {
                if (a[content] > b[content]) {
                    return order === 'asc' ? 1 : -1;
                } else if (a[content] < b[content]) {
                    return order === 'asc' ? -1 : 1;
                } else {
                    return 0;
                }
            })
        );
    } 


    //検索条件に基づいて総合的に評価し、ソートする関数
    //第一引数：施設情報が格納された配列
    //第二引数：評価平均を何順で評価するのかの値
    //第三引数：評価総数を何順で評価するのかの値
    //第四引数：距離を何順で評価するのかの値
    //返却：ソートされた配列
    const sort = (data:resultsType, rate:string, ratingsTotal:string, distance:string) => {

        //「評価平均」「評価総数」「距離」のそれぞれでソートした配列を作成
        let dataByRate: resultsType = data;
            dataByRate = sortDataListBy(
                data,
                'rating',
                rate === 'heigh' ? 'desc' : 'asc'
            );
        let dataByRatingsTotal: resultsType = data;
            dataByRatingsTotal = sortDataListBy(
                data,
                'userRatingsTotal',
                ratingsTotal === 'many' ? 'desc' : 'asc'
            );
        let dataByDistance: resultsType = data;
            dataByDistance = sortDataListBy(
                data,
                'distance',
                distance === 'far' ? 'desc' : 'asc'
            );


        // それぞれのデータの各規準における順位が格納された配列を要素にもつ、
        // 二次元配列「indexNumbersByCriteria」を作成
        //[ [データ１の順位配列], [データ２の順位配列], ...] となる
        //順位配列　＝　[　評価平均順のデータの順位, 評価総数順の順位, 距離順の順位　]
        let indexNumbersByCriteria:number[][]= []

        for (let i = 0; i < data.length; i++) {
            const indexNumber:number[] = []
            if(rate != 'unspecified'){
                indexNumber.push(dataByRate?.indexOf(data[i]));
            } else {
                indexNumber.push(0)
            }

            if(ratingsTotal != 'unspecified') {
                indexNumber.push(dataByRatingsTotal?.indexOf(data[i]));
            } else {
                indexNumber.push(0)
            }

            if(distance != 'unspecified') {
                indexNumber.push(dataByDistance?.indexOf(data[i]));
            } else {
                indexNumber.push(0)
            }
            indexNumbersByCriteria.push(indexNumber);
        }

        
        // 同じ値を持つデータに同じ順位をつける処理
        for (let i = 1; i< data.length + 1; i++) {
            if(dataByRate[i] && dataByRatingsTotal[i] && dataByDistance[i]){
                
                if ( dataByRate[i].rating === dataByRate[i-1].rating ) {
                    
                    //2つのデータのdata内での位置を取得
                    let data1 = data.indexOf(dataByRate[i-1]);
                    let data2 = data.indexOf(dataByRate[i]);

                    //順位の値を同じ値にそろえる
                    indexNumbersByCriteria[data1][0] = indexNumbersByCriteria[data2][0]
                }
                //以下「dataByrRatingsTotal」、「dataByDistance」も同様に処理。
                if ( dataByRatingsTotal[i].userRatingsTotal === dataByRatingsTotal[i-1].userRatingsTotal ) {
                    let data1 = data.indexOf(dataByRatingsTotal[i-1]);
                    let data2 = data.indexOf(dataByRatingsTotal[i]);

                    indexNumbersByCriteria[data1][1] = indexNumbersByCriteria[data2][1]
                }

                if ( dataByDistance[i].distance === dataByDistance[i-1].distance ) {
                    let data1 = data.indexOf(dataByDistance[i-1]);
                    let data2 = data.indexOf(dataByDistance[i]);

                    indexNumbersByCriteria[data1][2] = indexNumbersByCriteria[data2][2]
                }
            }
        }


        //それぞれのデータの順位の合計が格納される配列
        // 「sumIndexes」を作成
        //[ データ１の順位合計, データ２の順位合計, ...]　となる。
        let sumIndexes: number[] = []

        for (let indexNumbers of indexNumbersByCriteria) {
            let sumIndexNumbers = 0
            for(let indexNumber of indexNumbers) {
                sumIndexNumbers = sumIndexNumbers + indexNumber!
            }
            sumIndexes.push(sumIndexNumbers)
        }
        

        //「data」内のそれぞれのデータの「sumRank」の値を更新
        for(let i= 0; i < data.length; i++) {
            data[i].sumRank = sumIndexes[i]
        }


        //更新された「sumRank」の値で「data」を昇順にソート
        data.sort((a,b) => {
            if (a.sumRank < b.sumRank) {
                return -1;
            } else if (a.sumRank > b.sumRank) {
                return 1;
            } else {
                return 0;
            }
        })

        //最終的な順位が格納されるdata.rankを更新
        for ( let result of data ) {
            let index = data.indexOf(result);
            result.rank = index + 1;
            if ( index > 0 ) {
                const previousElement = data[index -1];
                if ( previousElement.sumRank ===  result.sumRank ) {
                    result.rank = previousElement.rank;
                };
            };
        };

        return{data}

    }

    return { sort }

}