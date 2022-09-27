import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { SwitchButton } from '../atoms/SwitchButton';

type Props = {
    label:string;
    defaultChecked?:boolean;
    checked:boolean;
    handleChange:(e:React.ChangeEvent<HTMLInputElement>) => void;
}

export const SwitchWithLabel:React.FC<Props> = React.memo((props) => {

    const { label, checked, handleChange, defaultChecked } = props;

    return (
        <FormGroup>
        <FormControlLabel
            sx={{ml: 0, mr: 'auto', justifyContent: 'space-around', width:'100%', maxWidth:370}}
            control={
            <SwitchButton 
                checked={checked}
                handleChange={handleChange}
                defaultChecked={defaultChecked} 
            />
            } 
            label={label}
            labelPlacement='start'
        />
        </FormGroup>
    );
})
