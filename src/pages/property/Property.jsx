import { useLoaderData, useNavigate } from "react-router-dom";

import { Box, Container, Typography, Grid, Stack, Chip, Card, CardContent, Button } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BedIcon from '@mui/icons-material/Bed';
import GarageIcon from '@mui/icons-material/Garage';
import BathroomIcon from '@mui/icons-material/Bathroom';

import MapPart from "./components/MapPart.jsx";
import PropertyRating from "./components/PropertyRating.jsx";

export default function Property() {
    const { property, id } = useLoaderData();
    const navigate = useNavigate();


    let amenities = property.amenities != null ? property.amenities.split(',') : [];

    return (
        <Container maxWidth="xl">
            <Stack direction="row" spacing={2} sx={{ mt: 3, mb: 3 }}>
                <Button
                    startIcon={<ArrowBackIcon />}
                    variant="contained"
                    label = "back"
                    onClick={() => navigate(-1)}
                >
                    Back
                </Button>

                <Typography variant="h4" sx={{ fontWeight: 600 }}>{property.title}</Typography>
            </Stack>

            <Grid container spacing={3} sx={{ my: 3 }}>
                <Grid size={{ xs: 12, md: 7 }}>
                    <Card sx={{ height: "100%", bgcolor: 'custom.card', borderRadius: 3, boxShadow: 3, }}>
                        <CardContent>

                            <Typography variant="h3" color="primary.main" sx={{ fontWeight: 600 }}>${property.rent}</Typography>

                            <Typography variant="body1" color="text.secondary" sx={{ mt: 1, color: 'text.secondary' }}>
                                {property.streetAddress}, {property.suburb} {property.postcode}
                            </Typography>

                            <Stack direction='row' spacing={4} sx={{ mt: 3 }}>
                                <Stack direction='row' spacing={1}>
                                    <BedIcon aria-label="Bedrooms" />
                                    <Typography variant="body1" color="primary.main">{property.bedrooms}</Typography>
                                </Stack>

                                <Stack direction='row' spacing={1}>
                                    <BathroomIcon aria-label="Bathrooms"/>
                                    <Typography variant="body1" color="primary.main">{property.bathrooms}</Typography>
                                </Stack>

                                <Stack direction='row' spacing={1}>
                                    <GarageIcon aria-label="Parking Spaces"/>
                                    <Typography variant="body1" color="primary.main">{property.parkingSpaces}</Typography>
                                </Stack>
                            </Stack>

                            <Box sx={{ mt: 3 }}>
                                <PropertyRating propertyId={id} defaultRating={property.averageRating} />
                            </Box>

                            <Stack direction="row" spacing={2} sx={{ mt: 2, flexWrap: "wrap" }}>
                                <Box>
                                    <Chip label={property.propertyType} color="primary" sx={{ mt: 1, ml: 2 }} />
                                </Box>

                                {amenities.map((amenity) => (
                                    <Box  key={amenity}>
                                        <Chip  label={amenity} color="primary" sx={{ mt: 1 }} />
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
                    <Card sx={{ height: "100%", borderRadius: 3, boxShadow: 3 }}>
                        <Box sx={{ width: "100%", height: "100%" }}>
                            {(property.latitude != null && property.longitude != null) ? <MapPart latitude={property.latitude} longitude={property.longitude} /> : null}
                        </Box>
                    </Card>
                </Grid>
            </Grid>


        </Container >
    );
}