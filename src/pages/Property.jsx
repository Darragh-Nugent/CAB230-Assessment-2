import React from "react";

import { Box, Container, Typography, Grid, Stack, Rating, Chip, Card, CardContent } from "@mui/material";
import BedIcon from '@mui/icons-material/Bed';
import GarageIcon from '@mui/icons-material/Garage';
import BathroomIcon from '@mui/icons-material/Bathroom';

import { useLoaderData } from "react-router-dom";

import MapPart from "../components/MapPart.jsx";


export default function Property({ id }) {
    const property = useLoaderData();

    let amenities = property.amenities != null ? property.amenities.split(',') : [];


    return (
        <Container maxWidth="xl">

            <Typography variant="h4" sx={{ mb: 3, mt: 3, fontWeight: 600 }}>{property.title}</Typography>

            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 7 }}>
                    <Card sx={{ height: "100%", bgcolor: 'custom.card', borderRadius: 3 }}>
                        <CardContent>

                            <Typography variant="h3" color="primary.main" sx={{ fontWeight: 600 }}>${property.rent}</Typography>

                            <Typography variant="body1" color="text.secondary" sx={{ mt: 1, color: 'text.secondary' }}>
                                {property.streetAddress}, {property.suburb} {property.postcode}
                            </Typography>

                            <Stack direction='row' spacing={4} sx={{ mt: 3 }}>
                                <Stack direction='row' spacing={1}>
                                    <BedIcon />
                                    <Typography variant="body1" color="primary.main">{property.bedrooms}</Typography>
                                </Stack>

                                <Stack direction='row' spacing={1}>
                                    <BathroomIcon />
                                    <Typography variant="body1" color="primary.main">{property.bathrooms}</Typography>
                                </Stack>

                                <Stack direction='row' spacing={1}>
                                    <GarageIcon />
                                    <Typography variant="body1" color="primary.main">{property.parkingSpaces}</Typography>
                                </Stack>
                            </Stack>

                            <Box sx={{ mt: 3 }}>
                                <Rating
                                    value={property.averageRating}
                                    precision={0.1}
                                    readOnly
                                />
                            </Box>

                            <Stack direction="row" spacing={2} sx={{ mt: 2, flexWrap: "wrap" }}>
                                <Box>
                                    <Chip label={property.propertyType} sx={{ mt: 1, ml: 2 }} />
                                </Box>

                                {amenities.map((amenity) => (
                                    <Box>
                                        <Chip key={amenity} label={amenity} sx={{ mt: 1 }} />
                                    </Box>
                                ))}
                            </Stack>


                            <Box sx={{ mt: 4 }}>
                                <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>Description</Typography>

                                <Box sx={{ lineHeight: 1.6 }}
                                    dangerouslySetInnerHTML={{ __html: property.description }}
                                />
                            </Box>

                            <Typography variant="caption" sx={{ color: 'text.secondary' }}>Listed by {property.agencyName}</Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid size={{ xs: 12, md: 5 }}>
                    <Card sx={{ height: "100%", borderRadius: 3 }}>
                        <Box sx={{ width: "100%", height: "100%" }}>
                            {(property.latitude != null && property.longitude != null) ? <MapPart latitude={property.latitude} longitude={property.longitude} /> : null}
                        </Box>
                    </Card>
                </Grid>
            </Grid>


        </Container >
    );
}