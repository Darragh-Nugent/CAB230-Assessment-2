import { useState, useEffect } from 'react';

import { Stack, Typography } from "@mui/material";

import NumberField from './NumberField';


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
                <NumberField
                    size="small"
                    label="Minimum value"
                    min={0}
                    value={minValue}
                    onValueChange={(value, e) => setMinValue(value)}
                />
            </Stack>

            <Stack spacing={1}>
                <Typography>{max}</Typography>
                <NumberField
                    size="small"
                    label="Maximum value"
                    min={0}
                    value={maxValue}
                    onValueChange={(value, e) => setMaxValue(value)}
                />
            </Stack>
        </Stack>
    );
}