import * as React from 'react';
import Switch from '@mui/material/Switch';

type Props = {
    checked:boolean;
    defaultChecked?:boolean;
    handleChange:(e:React.ChangeEvent<HTMLInputElement>) => void;
}


export const SwitchButton:React.FC<Props> = React.memo((props) => {
    
    const { defaultChecked, checked, handleChange } = props;


    return (
        <Switch
        defaultChecked={defaultChecked}
        checked={checked}
        onChange={handleChange}
        inputProps={{ 'aria-label': 'controlled' }}
        />
    );
})
