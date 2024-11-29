import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';

const MultiSelect = (props)=>{
    const {values, permissions, setPermissions} = props

    const theme = useTheme();
    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setPermissions(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

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

    function getStyles(name, personName, theme) {
        return {
            fontWeight: personName.includes(name)
                ? theme.typography.fontWeightMedium
                : theme.typography.fontWeightRegular,
        };
    }


    return(
        <Select
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            multiple
            required={true}
            value={permissions}
            onChange={handleChange}
            className={" rounded-md shadow-md"}
            renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                        <Chip key={value} label={value} />
                    ))}
                </Box>
            )}
            MenuProps={MenuProps}
        >
            {values.map((name) => (
                <MenuItem
                    key={name}
                    value={name}
                    style={getStyles(name, permissions, theme)}
                >
                    {name}
                </MenuItem>
            ))}
        </Select>
    )
}

export default MultiSelect;
