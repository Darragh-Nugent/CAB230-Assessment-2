import { useState, useEffect } from 'react';

import { Box, Stack, Typography, TextField } from "@mui/material";


export default function RangeSearchOption(props) {
    let { min, max, field, setFilterModel } = props;

    const [minValue, setMinValue] = useState('');
    const [maxValue, setMaxValue] = useState('');

    useEffect(() => {
        setFilterModel(prevFilters => ({

            ...prevFilters,
            [field]: {
                ...prevFilters[field],
                min: minValue,
                max: maxValue,
            }
        }))
    },
        [minValue, maxValue]);


    return (
        <Stack direction="row" spacing={2} alignItems="center">
            <Box sx={{ width: 180 }}>
                <Typography>{min}</Typography>
            </Box>

            <TextField
                size="small"
                label="Minimum value"
                min={0}
                // type='number'
                value={minValue}
                onChange={(e) => setMinValue(e.target.value)}
            />

            <Box sx={{ width: 180 }}>
                <Typography>{max}</Typography>
            </Box>

            <TextField
                size="small"
                label="Maximum value"
                min={0}
                type='number'
                value={maxValue}
                onChange={(e) => setMaxValue(e.target.value)}
            />

        </Stack>
    );
}