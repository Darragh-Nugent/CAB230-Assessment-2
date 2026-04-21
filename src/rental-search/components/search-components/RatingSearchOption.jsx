import { useState, useEffect } from 'react';

import { Box, Grid, Stack, Typography, TextField, Rating } from "@mui/material";


export default function RatingSearchOption(props) {
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
        <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
                <Stack direction="row" spacing={2}>
                    <Typography>{min}</Typography>

                    <Rating
                        value={minValue}
                        precision={0.1}
                        onChange={(event, newRating) => setMinValue(newRating)}
                    />
                </Stack>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
                <Stack direction="row" spacing={2}>
                    <Typography>{max}</Typography>

                    <Rating
                        value={maxValue}
                        precision={0.1}
                        onChange={(event, newRating) => setMaxValue(newRating)}
                    />
                </Stack>

            </Grid>
        </Grid>
    );
}