import React from "react";
import { Box, Typography, Grid, Card, CardContent } from "@mui/material";


const featuresData = [
    {
        heading: "Organic & Ethical",
        text: "All of our ingredients are organically sourced from local producers.",
        img: { src: "img/like.png", alt: "Thumbs up icon" }
    },
    {
        heading: "Live Entertainment",
        text: "On the first Saturday of every month, enjoy free live jazz entertainment from local bands.",
        img: { src: "img/faces.png", alt: "Entertainment icon" }
    },
    {
        heading: "Satisfaction guaranteed",
        text: "Not happy with your meal? A full refund will be provided, no questions asked!",
        img: { src: "img/heart.png", alt: "Heart icon" }
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
                    <Grid item key={index}>
                        <Card
                            sx={{
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
                                <Box
                                    component="img"
                                    src={feature.img.src}
                                    alt={feature.img.alt}
                                    sx={{
                                        width: 60,
                                        height: 60,
                                        mb: 2,
                                    }}
                                />

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