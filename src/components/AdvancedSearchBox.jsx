import { useState, useEffect } from 'react';
import { Box, Rating, Accordion, Stack, Typography, TextField, Card, CardContent, AccordionSummary, AccordionDetails } from "@mui/material";
import { DataGrid, getGridNumericOperators, getGridStringOperators } from '@mui/x-data-grid';

import { searchRentals, getStates, getPropertyTypes } from "../models/RentalModel.jsx";
import { ExpandMore } from '@mui/icons-material'

export default function AdvancedSearchBox() {
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
                    <AdvancedSearchOption min="Minimum rent" max="Maximum rent" />
                    <AdvancedSearchOption min="Minimum Bathrooms" max="Maximum Bathrooms" />
                    <AdvancedSearchOption min="Minimum Bedrooms" max="Maximum Bedrooms" />
                    <AdvancedSearchOption min="Minimum Parking" max="Maximum Parking" />
                    <AdvancedSearchOption min="Minimum Rating" max="Maximum Rating" />
                </Stack>
            </AccordionDetails>
        </Accordion>
    );
}

function AdvancedSearchOption(props) {
    let { min, max } = props;
    return (

        <Stack direction="row" spacing={2} alignItems="center">
            <Box sx={{ width: 180 }}>
                <Typography>{min}</Typography>
            </Box>
            <TextField
                size="small"
                variant="outlined"
                label="Minimum value"
            />
            <Box sx={{ width: 180 }}>
                <Typography>{max}</Typography>
            </Box>
            <TextField
                size="small"
                variant="outlined"
                label="Maximum value"
            />

        </Stack>
    );
}
