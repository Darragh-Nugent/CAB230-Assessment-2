import React from "react";
import { useState, useEffect } from 'react';

import { Box, Container, Typography, Grid } from "@mui/material";

import { getProperty } from "../models/RentalModel.jsx";
import { useLoaderData } from "react-router-dom";


export default function Property({ id }) {
    const property = useLoaderData();


    return (
        <Container maxWidth="lg">
            <Grid container spacing={2}>
                <Typography variant="h3" color="primary.main">{property.rent}</Typography>
                <Typography variant="subtitle1" color="text.secondary">{property.streetAddress}, {property.suburb} {property.postcode}</Typography>

            </Grid>

        </Container>
    );
}