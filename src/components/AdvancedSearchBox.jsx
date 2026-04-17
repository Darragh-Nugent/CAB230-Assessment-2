import { useState, useEffect } from 'react';
import { Box, Rating, Accordion, Stack, Typography, Card, CardContent, AccordionSummary, AccordionDetails, Button, TextField, Select, MenuItem } from "@mui/material";
import { DataGrid, getGridNumericOperators, getGridStringOperators } from '@mui/x-data-grid';

import NumberField from './NumberField.jsx';

import { searchRentals, getStates, getPropertyTypes } from "../models/RentalModel.jsx";
import { ExpandMore } from '@mui/icons-material'
import { propValidatorsDataGrid } from '@mui/x-data-grid/internals';

export default function AdvancedSearchBox({ filterModel, setFilterModel, states, propertyTypes }) {

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
                expandIcon={<ExpandMore sx={{ color: 'primary.contrastText' }} />}
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
                    <RangeSearchOption min="Minimum rent" max="Maximum rent" field="rent" setFilterModel={setFilterModel} />
                    <RangeSearchOption min="Minimum Bathrooms" max="Maximum Bathrooms" field="bathrooms" setFilterModel={setFilterModel} />
                    <RangeSearchOption min="Minimum Bedrooms" max="Maximum Bedrooms" field="bedrooms" setFilterModel={setFilterModel} />
                    <RangeSearchOption min="Minimum Parking" max="Maximum Parking" field="parkingSpaces" setFilterModel={setFilterModel} />
                    <RangeSearchOption min="Minimum Rating" max="Maximum Rating" field="averageRating" setFilterModel={setFilterModel} />
                    <SetSearchOption set={states} label="State" field="state" setFilterModel={setFilterModel} />
                </Stack>
            </AccordionDetails>
        </Accordion>
    );
}

function RangeSearchOption(props) {
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


function SetSearchOption(props) {
    let { set, label, field, setFilterModel } = props

    const [selected, setSelected] = useState('');

    useEffect(() => {
        setFilterModel(prevFilters => ({

            ...prevFilters,
            [field]: selected,
        }))
    }, [selected]);


    return (
        <Stack direction="row" spacing={2} alignItems="center">
            <Box sx={{ width: 180 }}>
                <Typography>{label}</Typography>
            </Box>

            <Select
                size="small"
                label={label}
                value={selected}
                onChange={(e) => setSelected(e.target.value)}
            >
                <MenuItem value=""></MenuItem>
                {
                    set.map((value) => (
                        <MenuItem value={value}>{value}</MenuItem>
                    ))
                }
            </Select>
        </Stack>
    );
}