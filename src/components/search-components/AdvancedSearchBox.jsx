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
                    <ValueSearchOption label="Suburb" field="suburb" setFilterModel={setFilterModel} />
                    <ValueSearchOption label="Postcode" field="postcode" setFilterModel={setFilterModel} />
                    
                    <SetSearchOption set={states} label="State" field="state" setFilterModel={setFilterModel} />

                    <RangeSearchOption min="Minimum rent" max="Maximum rent" field="rent" setFilterModel={setFilterModel} />
                    <RangeSearchOption min="Minimum Bathrooms" max="Maximum Bathrooms" field="bathrooms" setFilterModel={setFilterModel} />
                    <RangeSearchOption min="Minimum Bedrooms" max="Maximum Bedrooms" field="bedrooms" setFilterModel={setFilterModel} />
                    <RangeSearchOption min="Minimum Parking" max="Maximum Parking" field="parkingSpaces" setFilterModel={setFilterModel} />

                    <RatingSearchOption min="Minimum Rating" max="Maximum Rating" field="averageRating" setFilterModel={setFilterModel} />

                    <SetSearchOption set={propertyTypes} label="Property Type" field="propertyTypes" selectionType="multiple" setFilterModel={setFilterModel} />

                </Stack>
            </AccordionDetails>
        </Accordion>
    );
}