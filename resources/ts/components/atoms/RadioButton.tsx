import { FormControlLabel, Radio } from "@mui/material";
import { FC, memo } from "react";

type Props = {
    label:string;
    value:string;
}

export const RadioButton:FC<Props> = memo( (props) => {

    const {label, value} = props;

    return(
        <FormControlLabel control={<Radio />} label={label} value={value}/>
    )
})