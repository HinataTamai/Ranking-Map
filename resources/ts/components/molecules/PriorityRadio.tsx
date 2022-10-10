import React, { FC, memo } from "react";
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Stack } from "@mui/material";

type Props = {
    contents: {
        label: string,
        value: string
    }[];
    required?: boolean;
    radioTitle:string;
    value: string;
    my? : string;
    onChange: (e:React.ChangeEvent<HTMLInputElement>) => void;
}

export const PriorityRadio:FC<Props> = memo( (props) => {



    const { contents, required, radioTitle, value, my, onChange } = props;

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
                    justifyContent={{sm: 'space-around'}}
                    spacing={{
                        sm:2,
                        md:3
                    }}
                    sx={{width:{xs: '40%', sm: '100%'}}}
                >
                {contents.map(content => (
                    <FormControlLabel 
                        key={content.label}
                        control={<Radio/>} 
                        label={content.label} 
                        value={content.value} 
                    />
                ))}
                </Stack>
            </RadioGroup>
        </FormControl>
        </>
    )
})