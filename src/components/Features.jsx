import React from "react";

import { Box, Typography, Grid, Card, CardContent } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import BalanceIcon from '@mui/icons-material/Balance';
import AirlineStopsIcon from '@mui/icons-material/AirlineStops';

const featuresData = [
    {
        heading: "Ethical Business",
        text: "All of our rentals are priced gauged using the most ethical methods.",
        img: function () {
            return (<BalanceIcon
                sx={{
                    color: "gold",
                    fontSize: 50
                }}
            />
            )
        }
    },
    {
        heading: "From tip to Tasmania",
        text: "Explore properties from locations you have never seen before and places you never want to see again.",
        img: function () {
            return (<AirlineStopsIcon
                sx={{
                    color: "white",
                    fontSize: 50
                }}
            />
            )
        }
    },
    {
        heading: "Satisfaction guaranteed",
        text: "Not happy with your property? we'd be happy to point to the place in your contract that says we don't need to do doodly squat about it!",
        img: function () {
            return (<FavoriteIcon
                sx={{
                    color: "red",
                    fontSize: 50
                }}
            />
            )
        }
    }
];

export default function Features() {
    return (
        <Box sx={{ py: '2em', color: "secondary.contrastText", backgroundColor: "secondary.main" }}>

            {/* Header */}
            <Box sx={{ textAlign: "center", mb: 6 }}>
                <Typography variant="h3">
                    Our Promise
                </Typography>
            </Box>

            <Grid container spacing={2}>
                {featuresData.map((feature, index) => (
                    <Grid size={{ xs: 12, md: 4 }} key={index}>
                        <Card
                            sx={{
                                height: 200,
                                alignItems: 'center',

                                display: 'flex',
                                textAlign: "center",
                                p: 2,
                                backgroundColor: "secondary.dark",
                                color: "secondary.contrastText",
                                transition: "0.3s",
                                "&:hover": {
                                    transform: "translateY(-5px)",
                                },
                            }}
                        >
                            <CardContent>
                                {feature.img()}

                                <Typography variant="h5" sx={{ mb: 1 }}>
                                    {feature.heading}
                                </Typography>

                                <Typography variant="body1">
                                    {feature.text}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}