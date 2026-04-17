import { useState, useEffect } from 'react';

import { Box, Stack, Typography, TextField, Rating } from "@mui/material";


export default function RatingSearchOption(props) {
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

            <Rating
                value={minValue}
                precision={0.1}
                onChange={(event, newRating) => setMinValue(newRating)}
            />

            <Box sx={{ width: 180 }}>
                <Typography>{max}</Typography>
            </Box>

            <Rating
                value={maxValue}
                precision={0.1}
                onChange={(event, newRating) => setMaxValue(newRating)}
            />
        </Stack>
    );
}