import { FormControl, FormLabel, RadioGroup, Stack } from "@mui/material";
import React, { FC, memo } from "react";
import { RadioButton } from "../atoms/RadioButton";

type Props = {
    label_1: string;
    label_2: string;
    label_3: string;
    value_1: string;
    value_2: string;
    value_3: string;
    required?: boolean;
    radioTitle:string;
    value: string;
    my? : string;
    onChange: (e:React.ChangeEvent<HTMLInputElement>) => void;
}

export const PriorityRadio:FC<Props> = memo( (props) => {



    const { label_1, label_2, value_1, value_2, label_3, value_3,required, radioTitle, value, my, onChange } = props;

    return(
        <>
        <FormControl sx={{my: my, width: '100%' }}>
            <FormLabel required={required} sx={{textAlign: 'centeer'}}>{radioTitle}</FormLabel>
            <RadioGroup
                row 
                onChange={onChange}
                value={value}
                sx={{display: 'flex', justifyContent: 'flex-end'}}
            >
                <Stack 
                    flexWrap={'wrap'} 
                    direction={{sm: 'row'}}
                    justifyContent={{sm: 'center'}}
                    spacing={{
                        sm:2,
                        md:3
                    }}
                    sx={{width:{xs: '40%', sm: '100%'}}}
                >
                <RadioButton label={label_1} value={value_1} />
                <RadioButton label={label_2} value={value_2} />
                <RadioButton label={label_3} value={value_3} />
                </Stack>
            </RadioGroup>
        </FormControl>
        </>
    )
})