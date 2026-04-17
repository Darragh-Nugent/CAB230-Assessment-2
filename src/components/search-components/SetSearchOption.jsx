import { useState, useEffect } from 'react';

import { Box, Stack, Typography, Select, MenuItem } from "@mui/material";

export default function SetSearchOption(props) {
    let { set, label, field, setFilterModel, selectionType = "single" } = props

    const [selected, setSelected] = selectionType === 'multiple' ? useState([]) : useState(null);

    useEffect(() => {
        setFilterModel(prevFilters => ({

            ...prevFilters,
            [field]: selected,
        }))
    }, [selected]);


    return (
        <Stack direction="row" spacing={2} alignItems="center">
            <Box sx={{ width: 180 }}>
                <Typography>{label}</Typography>
            </Box>

            <Select
                size="small"
                label={label}
                value={selected}
                multiple={ selectionType === 'multiple' ? true : false }
                onChange={(e) => setSelected(e.target.value)}
            >
                <MenuItem value=""></MenuItem>
                {
                    set.map((value) => (
                        <MenuItem value={value}>{value}</MenuItem>
                    ))
                }
            </Select>
        </Stack>
    );
}