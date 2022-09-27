import React, { FC, memo, useState } from "react";
import  TextField from '@mui/material/TextField';
import { MenuItem } from "@mui/material";

type Props = {
    id: string;
    label: string;
    required?: boolean;
    variant: 'outlined' | 'filled' | 'standard' ;
    selectValues: {value: number, label: string}[];
    selectValue: string |number | undefined;
    width?: number;
    onChange: (e:React.ChangeEvent<HTMLInputElement>) => void;
}

export const  TextSelect:FC<Props> = memo( (props) => {


    const { id ,label,  variant, selectValues, selectValue, width, required, onChange } = props;





    return(
        <TextField
        id={id}
        select
        required={required}
        label={label}
        value={selectValue}
        variant={variant}
        onChange={onChange}
        sx={{
            width:width
        }}
        >
            {selectValues.map((select) => (
                <MenuItem key={select.value} value={select.value}>
                {select.label}
                </MenuItem>
            ))}
        </TextField>
    )
})