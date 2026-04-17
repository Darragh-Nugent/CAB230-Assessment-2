import { useState, useEffect } from 'react';

import { Box, Stack, Typography, TextField } from "@mui/material";


export default function RangeSearchOption(props) {
    let { label, field, cleared, setFilterModel, number = false} = props;

    const [value, setValue] = useState('');
    const [error, setError] = useState('');

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
                error={error}
                helperText={error}
                value={value}
                onChange={(e) => {
                    let value = e.target.value
                    if (number && Number.isInteger(Number(value))) {
                        setValue(value);
                        setError('');
                    } else {
                        setError("Must be a valid postcode");
                    }

                }}
            />
        </Stack>
    );
}