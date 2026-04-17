import { useState, useEffect } from 'react';

import { Box, Stack, Typography, TextField } from "@mui/material";


export default function RangeSearchOption(props) {
    let { label, field, setFilterModel } = props;

    const [value, setValue] = useState('');

    useEffect(() => {
        setFilterModel(prevFilters => ({

            ...prevFilters,
            [field]: value,
        }))
    }, [value]);


    return (
        <Stack direction="row" spacing={2} alignItems="center">
            <Box sx={{ width: 180 }}>
                <Typography>{label}</Typography>
            </Box>

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