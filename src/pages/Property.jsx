import React from "react";
import { useState, useEffect } from 'react';

import { Box, Container, Typography, Grid, Stack, Rating, Chip } from "@mui/material";
import BedIcon from '@mui/icons-material/Bed';
import GarageIcon from '@mui/icons-material/Garage';
import BathroomIcon from '@mui/icons-material/Bathroom';

import { getProperty } from "../models/RentalModel.jsx";
import { useLoaderData } from "react-router-dom";


export default function Property({ id }) {
    const property = useLoaderData();

    let amenities = property.amenities != null ? property.amenities.split(',') : [];


    return (
        <Container maxWidth="lg">
            <Box>
                <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>{property.title}</Typography>
            </Box>
            <Grid container spacing={2}>
                <Grid size>
                    <Typography variant="h3" color="primary.main">${property.rent}</Typography>

                    <Typography variant="subtitle1" color="text.secondary">{property.streetAddress}, {property.suburb} {property.postcode}</Typography>

                    <Stack direction='row' spacing={2}>
                        <Box>
                            <BedIcon />
                            <Typography variant="body1" color="primary.main">{property.bedrooms}</Typography>
                        </Box>

                        <Box>
                            <BathroomIcon />
                            <Typography variant="body1" color="primary.main">{property.bathrooms}</Typography>
                        </Box>

                        <Box>
                            <GarageIcon />
                            <Typography variant="body1" color="primary.main">{property.parkingSpaces}</Typography>
                        </Box>
                    </Stack>

                    <Rating
                        value={property.averageRating}
                        precision={0.1}
                        readOnly
                    />

                    <Chip label={property.propertyType} />

                    {amenities.map((amenity) => (
                        <Chip key={amenity} label={amenity} />
                    ))}

                    <Box>
                        <Typography variant="h6" color="primary.main">Description</Typography>
                        <Typography variant="body1" color="text.primary">{property.description}</Typography>
                    </Box>

                    <Typography variant="caption" color="text.secondary">Listed by {property.agencyName}</Typography>
                </Grid>

                <Grid>
                    
                </Grid>
            </Grid>

        </Container>
    );
}

// function AmenityList(amenities) {
//     return (

//     )

// }