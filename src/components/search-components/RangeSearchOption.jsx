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
        <Stack direction="row" spacing={4}>
            <Stack spacing={1}>
                <Typography>{min}</Typography>
                <TextField
                    size="small"
                    label="Minimum value"
                    value={minValue}
                    onChange={(e) => setMinValue(e.target.value)}
                />
            </Stack>

            <Stack spacing={1}>
                <Typography>{max}</Typography>
                <TextField
                    size="small"
                    label="Maximum value"
                    value={maxValue}
                    onChange={(e) => setMaxValue(e.target.value)}
                />
            </Stack>
        </Stack>
    );
}