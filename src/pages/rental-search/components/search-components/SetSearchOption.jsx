import { useState, useEffect } from 'react';

import { Stack, Typography, Select, MenuItem } from "@mui/material";

export default function SetSearchOption(props) {
    let { set, label, field, cleared, setFilterModel, selectionType = "single" } = props

    const [selected, setSelected] = selectionType === 'multiple' ? useState([]) : useState(null);

    useEffect(() => {
        setFilterModel(prevFilters => ({

            ...prevFilters,
            [field]: selected,
        }))
    }, [selected]);

        useEffect(() => {
            setSelected(selectionType === 'multiple' ? [] : null);
        }, [cleared]);


    return (
        <Stack direction="row" spacing={2}>
                <Typography>{label}</Typography>

            <Select
                size="small"
                label={label}
                value={selected}
                multiple={ selectionType === 'multiple' ? true : false }
                onChange={(e) => setSelected(e.target.value)}
            >
                {
                    selectionType === 'multiple' ? null : <MenuItem value=""><em>None</em></MenuItem>
                }
                {
                    set.map((value) => (
                        <MenuItem value={value}>{value}</MenuItem>
                    ))
                }
            </Select>
        </Stack>
    );
}