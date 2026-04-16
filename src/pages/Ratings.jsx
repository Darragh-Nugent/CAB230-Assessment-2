import { Box, Rating, Typography, Grid, Card, CardContent, Container } from "@mui/material";
import { useState, useEffect, createContext } from 'react';

import RentalCard from "../components/RentalCard";
import { getRatings } from "../models/RatingModel";
import { getProperty } from "../models/RentalModel";


export default function Ratings() {
    const [page, setPage] = useState({
        page: 0,
        pageSize: 20,
    });
    const [rentals, setRentals] = useState([]);

    useEffect(() => {
        async function loadRatings() {
            const newRatings = await getRatings(page);
            const newProperties = await Promise.all(newRatings.data.map(async (rating) => {
                let property = await getProperty(rating.rentalId);
                return {
                    ...property,
                    userRating: rating.rating,
                    dateTime: rating.dateTime,
                };
            }))

            setRentals(rentals => ([...rentals, ...newProperties]));
        }

        loadRatings();
    }, [page]);

    return (
        <Container maxWidth="xl">
            <Grid container spacing={3} sx={{my: 3}}>
                {
                    rentals.map((curRental) => (
                        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                            <RentalCard rental={curRental} />
                        </Grid>
                    ))
                }
            </Grid>

        </Container>

    );
}