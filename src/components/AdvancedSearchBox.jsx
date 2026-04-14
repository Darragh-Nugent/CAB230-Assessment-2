import { useState, useEffect } from 'react';
import { Box, Rating, Accordion, Stack, Typography, Card, CardContent, AccordionSummary, AccordionDetails, Button, TextField } from "@mui/material";
import { DataGrid, getGridNumericOperators, getGridStringOperators } from '@mui/x-data-grid';

import NumberField from './NumberField.jsx';

import { searchRentals, getStates, getPropertyTypes } from "../models/RentalModel.jsx";
import { ExpandMore } from '@mui/icons-material'

export default function AdvancedSearchBox({ filterModel, setFilterModel }) {
    return (
        <Accordion
            sx={{
                bgcolor: 'background.paper',
                borderRadius: 2,
                boxShadow: 3,
                '&:before': { display: 'none' } // remove default divider line
            }}
        >
            <AccordionSummary
                expandIcon={<ExpandMore />}
                sx={{
                    bgcolor: 'primary.main',
                    color: 'primary.contrastText',
                    // borderRadius: 2,
                }}
            >
                <Typography variant='h5'>Advanced Search</Typography>
            </AccordionSummary>
            <AccordionDetails
                sx={{
                    bgcolor: 'custom.backgroundLight',
                    p: 3,
                }}>
                <Stack spacing={2} sx={{ flexGrow: 2 }}>
                    <AdvancedSearchOption min="Minimum rent" max="Maximum rent" field="rent" setFilterModel={setFilterModel} />
                    <AdvancedSearchOption min="Minimum Bathrooms" max="Maximum Bathrooms" field="bathrooms" setFilterModel={setFilterModel} />
                    <AdvancedSearchOption min="Minimum Bedrooms" max="Maximum Bedrooms" field="bedrooms" setFilterModel={setFilterModel} />
                    <AdvancedSearchOption min="Minimum Parking" max="Maximum Parking" field="parkingSpaces" setFilterModel={setFilterModel} />
                    <AdvancedSearchOption min="Minimum Rating" max="Maximum Rating" field="averageRating" setFilterModel={setFilterModel} />
                </Stack>
            </AccordionDetails>
        </Accordion>
    );
}

function AdvancedSearchOption(props) {
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
                type='number'
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
