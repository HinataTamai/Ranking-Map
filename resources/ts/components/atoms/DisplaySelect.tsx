import { memo, useContext, useState } from 'react';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { Checkbox, FormHelperText, ListItemText } from '@mui/material';

import { DataTableContext } from '../../providers/DataTableProvider';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
        },
    },
};

const items = [
    '評価平均',
    '評価総数',
    '距離',
];


export const DisplaySelect = memo(() => {

    const [error, setError ] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const { display,setDisplay } = useContext(DataTableContext);

    const handleChange = (event: SelectChangeEvent<typeof display>) => {
        const { target: { value } } = event;
        const valueLength = value.length;
        switch (valueLength) {
            case 0:
                setErrorMessage('1つ以上の項目を選択してください。');
                setError(true);
                break;
            case 1:
                setErrorMessage('');
                setError(false);
                break;
            case 2:
                setErrorMessage('');
                setError(false);
                break;
            case 3:
                setErrorMessage('3つ未満の項目を選択してください');
                setError(true);
                break;
        }
        setDisplay(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    return (
        <div>
        <FormControl sx={{ m: 1, width: 300 }} error={error}>
            <InputLabel id="multiple-chip-label">表示項目（1つ以上3つ未満）</InputLabel>
            {error && <FormHelperText>{ errorMessage }</FormHelperText>}
            <Select
                labelId="multiple-chip-label"
                multiple
                value={display}
                onChange={handleChange}
                input={<OutlinedInput label="表示項目（1つ以上3つ未満）" />}
                renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                        <Chip key={value} label={value} />
                    ))}
                    </Box>
                )}
                MenuProps={MenuProps}
            >
            {items.map((item) => (
                <MenuItem key={item} value={item}>
                    <Checkbox checked={display.indexOf(item) > -1} />
                    <ListItemText primary={item} />
                </MenuItem>
            ))}
            </Select>
        </FormControl>
        </div>
    );
})
