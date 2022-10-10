import React, { FC, memo } from "react";
import { Divider, FormControl } from "@mui/material";
import { Box, Stack } from "@mui/system";

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
                contents={[
                    {label: '高い順', value: 'heigh'},
                    {label: '低い順', value: 'low'},
                    {label: '指定なし', value: 'unspecified'},
                ]}
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
                contents={[
                    {label: '多い順', value: 'many'},
                    {label: '少ない順', value: 'few'},
                    {label: '指定なし', value: 'unspecified'},
                ]}
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
                contents={[
                    {label: '近い順', value: 'near'},
                    {label: '遠い順', value: 'far'},
                    {label: '指定なし', value: 'unspecified'},
                ]}
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