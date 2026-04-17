import { useState, useEffect } from 'react';

import { Box, Stack, Typography, TextField } from "@mui/material";


export default function RangeSearchOption(props) {
    let { min, max, field, cleared, setFilterModel } = props;

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

    useEffect(() => {
        setMinValue('');
        setMaxValue('');
    }, [cleared]);

    return (
        <Stack direction="row" spacing={2} alignItems="center">
            <Box sx={{ width: 180 }}>
                <Typography>{min}</Typography>
            </Box>

            <TextField
                size="small"
                label="Minimum value"
                min={0}
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
                value={maxValue}
                onChange={(e) => setMaxValue(e.target.value)}
            />

        </Stack>
    );
}