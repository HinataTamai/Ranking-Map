import { FC, memo } from "react";
import  TextField from '@mui/material/TextField';

type Props = {
    id: string;
    label: string;
    type: string;
    variant: 'outlined' | 'filled' | 'standard' ;
    value: string | undefined;
    required?: boolean;
    onChange: (e:React.ChangeEvent<HTMLInputElement>) => void;
}

export const  TextInput:FC<Props> = memo( (props) => {

    const { id ,label, type, variant, value,required, onChange } = props;

    return(
        <TextField 
            id={id} 
            label={label} 
            type={type} 
            variant={variant} 
            value={value}
            onChange={onChange}
            required={required}
        />
    )
})