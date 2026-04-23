import { useState } from 'react';

import { Accordion, Typography, AccordionSummary, AccordionDetails, Button, Grid } from "@mui/material";
import { ExpandMore } from '@mui/icons-material'

import RangeSearchOption from "./search-components/RangeSearchOption.jsx";
import SetSearchOption from "./search-components/SetSearchOption.jsx";
import ValueSearchOption from "./search-components/ValueSearchOption.jsx";
import RatingSearchOption from './search-components/RatingSearchOption.jsx';

export default function AdvancedSearchBox({ filterModel, setFilterModel, states, propertyTypes }) {
    const [cleared, setCleared] = useState(false);

    return (
        <Accordion
            square='false'
            sx={{
                bgcolor: 'background.paper',
                borderRadius: 3,
                boxShadow: 3,
            }}
        >
            <AccordionSummary
                expandIcon={<ExpandMore sx={{ color: 'primary.contrastText' }} />}
                sx={{
                    bgcolor: 'primary.main',
                    color: 'primary.contrastText',
                    borderRadius: 3,
                    px: 3,
                    py: 1.5,
                }}
            >
                <Typography variant='h5'>Available Filters</Typography>
            </AccordionSummary>
            <AccordionDetails
                sx={{
                    bgcolor: 'custom.backgroundLight',
                    borderRadius: 3,
                    p: 3,
                }}>
                <Grid container spacing={3} sx={{ my: 3 }}>

                    <Grid size={{ xs: 12 }}>
                        <Typography variant="subtitle2">Location</Typography>
                    </Grid>

                    <Grid size={{ xs: 12 }}>
                        <SetSearchOption set={states} label="State" field="state" cleared={cleared} setFilterModel={setFilterModel} />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <ValueSearchOption label="Suburb" field="suburb" cleared={cleared} setFilterModel={setFilterModel} />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <ValueSearchOption 
                        label="Postcode" 
                        field="postcode" 
                        cleared={cleared} 
                        number={true}
                        errorMessage={"Must be a valid postcode"} 
                        valueType="number"
                        setFilterModel={setFilterModel} />
                    </Grid>

                    <Grid size={{ xs: 12 }}>
                        <Typography variant="subtitle2" sx={{ mt: 2 }}>Property Details</Typography>
                    </Grid>

                    <Grid size={{ xs: 12 }}>
                        <SetSearchOption set={propertyTypes} label="Property Types" field="propertyTypes" selectionType="multiple" cleared={cleared} setFilterModel={setFilterModel} />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <RatingSearchOption min="Minimum Rating" max="Maximum Rating" field="averageRating" cleared={cleared} setFilterModel={setFilterModel} />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <RangeSearchOption min="Minimum Rent" max="Maximum Rent" field="rent" cleared={cleared} setFilterModel={setFilterModel} />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <RangeSearchOption min="Minimum Bathrooms" max="Maximum Bathrooms" field="bathrooms" cleared={cleared} setFilterModel={setFilterModel} />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <RangeSearchOption min="Minimum Bedrooms" max="Maximum Bedrooms" field="bedrooms" cleared={cleared} setFilterModel={setFilterModel} />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <RangeSearchOption min="Minimum Parking" max="Maximum Parking" field="parkingSpaces" cleared={cleared} setFilterModel={setFilterModel} />
                    </Grid>

                </Grid>

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
            </AccordionDetails>
        </Accordion>
    );
}