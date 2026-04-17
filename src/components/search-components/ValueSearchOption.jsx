import { useState, useEffect } from 'react';

import { Box, Stack, Typography, TextField } from "@mui/material";


export default function RangeSearchOption(props) {
    let { label, field, cleared, setFilterModel } = props;

    const [value, setValue] = useState('');

    useEffect(() => {
        setFilterModel(prevFilters => ({

            ...prevFilters,
            [field]: value,
        }))
    }, [value]);

    useEffect(() => {
        setValue('');
    }, [cleared]);


    return (
        <Stack direction="row" spacing={2} >
                <Typography>{label}</Typography>

            <TextField
                size="small"
                label={label}
                min={0}
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
        </Stack>
    );
}