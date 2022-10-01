import { Divider, FormControl } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React, { FC, memo, useContext } from "react";
import { SearchCriteriaContext } from "../../providers/SearchCriteriaProvider";
import { PriorityRadio } from "../molecules/PriorityRadio";

type Props = {
    handleRate: (e:React.ChangeEvent<HTMLInputElement>) => void;
    rateValue: string;
    handleRatingsTotal: (e:React.ChangeEvent<HTMLInputElement>) => void;
    ratingsTotalValue: string;
    handleDistance: (e:React.ChangeEvent<HTMLInputElement>) => void;
    distanceValue: string;
}

export const PriorityRadios:FC<Props> = memo( (props) => {

    const { handleRate, rateValue, handleRatingsTotal, ratingsTotalValue, handleDistance, distanceValue } = props; 



    return(
        <FormControl>
            <Stack spacing={2} >
            <Box>
            <PriorityRadio
                value={rateValue}
                label_1="高い順"
                value_1="heigh"
                label_2="低い順"
                value_2="low"
                label_3='指定なし'
                value_3='unspecified'
                required
                radioTitle="レビュー評価"
                my='10px'
                onChange={handleRate}
            />
            <Divider />
            </Box>
            <Box>
            <PriorityRadio
                value={ratingsTotalValue}
                label_1="多い順"
                value_1="many"
                label_2="少ない順"
                value_2="few"
                label_3='指定なし'
                value_3='unspecified'
                required
                radioTitle="評価数"
                my='10px'
                onChange={handleRatingsTotal}
            />
            <Divider />
            </Box>
            <Box>
            <PriorityRadio
                value={distanceValue}
                label_1="近い順"
                value_1="near"
                label_2="遠い順"
                value_2="far"
                label_3='指定なし'
                value_3='unspecified'
                required
                radioTitle="検索地点からの距離"
                my='10px'
                onChange={handleDistance}
            />
            <Divider />
            </Box>
            </Stack>
        </FormControl>
    )
})