import { useContext } from "react";
import { DataTableContext } from "../providers/DataTableProvider";
import resultType from "../types/resultType";

export const useDataTable = () => {

    const {
        display
    } = useContext(DataTableContext);


    //検索結果表示画面のテーブル内で表示されなかった項目の情報が格納された配列を返す関数
    const createCollapseDisplayItems = () => {

        //最終的に返り値となる配列
        let collapseDisplayItems:{
            label:string;
            value: 'rating' | 'userRatingsTotal' | 'distance',
        }[] = [
            {
                label: '距離',
                value: 'distance'
            }
        ]

        //検索結果表示画面で表示可能な項目の一覧が格納された配列（比較対象用）
        const items = [
            '評価平均',
            '評価総数',
            '距離',
        ];

        //表示されていない項目名が格納された配列
        const undisplayedItems = items.filter(i => display.indexOf(i) == -1);

        if(display.length == 2) {
            switch(undisplayedItems[0]) {
                case '評価平均':
                    collapseDisplayItems[0] = {
                            label: '評価平均',
                            value: 'rating'
                        }
                    break;

                case '評価総数':
                    collapseDisplayItems[0] = {
                            label: '評価総数',
                            value: 'userRatingsTotal'
                        }
                    break;
                    
                case '距離':
                    collapseDisplayItems[0] = {
                            label: '距離',
                            value: 'distance'
                        }
                    break;
            }
        } else if (display.length == 1) {
            for(let i=0; i<2; i++) {
                switch(undisplayedItems[i]) {
                    case '評価平均':
                        collapseDisplayItems[i] = {
                                label: '評価平均',
                                value: 'rating'
                            }
                        break;
    
                    case '評価総数':
                        collapseDisplayItems[i] = {
                                label: '評価総数',
                                value: 'userRatingsTotal'
                            }
                        break;
    
                    case '距離':
                        collapseDisplayItems[i] = {
                                label: '距離',
                                value: 'distance'
                            }
                        break;
                }
            }
        }


        return collapseDisplayItems;
    }





    return { createCollapseDisplayItems }

}