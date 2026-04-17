import { useState, useEffect } from 'react';

import { Box, Rating, Accordion, Stack, Typography, Card, CardContent, AccordionSummary, AccordionDetails, Button, TextField, Select, MenuItem } from "@mui/material";
import { DataGrid, getGridNumericOperators, getGridStringOperators } from '@mui/x-data-grid';
import { ExpandMore } from '@mui/icons-material'
import { propValidatorsDataGrid } from '@mui/x-data-grid/internals';

import { searchRentals, getStates, getPropertyTypes } from "../../models/RentalModel.jsx";
import RangeSearchOption from "./RangeSearchOption.jsx";
import SetSearchOption from "./SetSearchOption.jsx";
import ValueSearchOption from "./ValueSearchOption.jsx";
import RatingSearchOption from './RatingSearchOption.jsx';

export default function AdvancedSearchBox({ filterModel, setFilterModel, states, propertyTypes }) {
    const [cleared, setCleared] = useState(false);

    return (
        <Accordion
            sx={{
                bgcolor: 'background.paper',
                borderRadius: 2,
                boxShadow: 3,
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
                    <Typography variant="subtitle2" sx={{ mt: 1 }}>
                        Location
                    </Typography>

                    <ValueSearchOption label="Suburb" field="suburb" cleared={cleared} setFilterModel={setFilterModel} />
                    <ValueSearchOption label="Postcode" field="postcode" cleared={cleared} setFilterModel={setFilterModel} />
                    <SetSearchOption set={states} label="State" field="state" cleared={cleared} setFilterModel={setFilterModel} />

                    <Typography variant="subtitle2" sx={{ mt: 2 }}>
                        Property Details
                    </Typography>

                    <SetSearchOption set={propertyTypes} label="Property Type" field="propertyTypes" selectionType="multiple"  cleared={cleared} setFilterModel={setFilterModel} />
                    <RatingSearchOption min="Minimum Rating" max="Maximum Rating" field="averageRating" cleared={cleared} setFilterModel={setFilterModel} />

                    <RangeSearchOption min="Minimum rent" max="Maximum rent" field="rent" cleared={cleared} setFilterModel={setFilterModel} />
                    <RangeSearchOption min="Minimum Bathrooms" max="Maximum Bathrooms" field="bathrooms" cleared={cleared} setFilterModel={setFilterModel} />
                    <RangeSearchOption min="Minimum Bedrooms" max="Maximum Bedrooms" field="bedrooms" cleared={cleared} setFilterModel={setFilterModel} />
                    <RangeSearchOption min="Minimum Parking" max="Maximum Parking" field="parkingSpaces" cleared={cleared} setFilterModel={setFilterModel} />

                    <Button
                        variant="contained"
                        color='primary'
                        onClick={() => {
                            setFilterModel({
                                suburb: '',
                                state: '',
                                postcode: '',
                                rent: { min: '', max: '' },
                                bathrooms: { min: '', max: '' },
                                bedrooms: { min: '', max: '' },
                                parkingSpaces: { min: '', max: '' },
                                averageRating: { min: '', max: '' },
                                propertyTypes: [],
                            })
                            setCleared(!cleared);
                        }}
                    >
                        Clear Filters
                    </Button>
                </Stack>
            </AccordionDetails>
        </Accordion>
    );
}