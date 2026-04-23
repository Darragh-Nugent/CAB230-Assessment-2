import { Box, Typography, Grid, Container } from "@mui/material";
import { useState, useEffect } from 'react';

import { useInView } from "react-intersection-observer";

import RentalCard from "./components/RentalCard";
import { getRatings } from "../../api/ratingApi";
import { getProperty } from "../../api/rentalApi";


export default function Ratings() {
    const [page, setPage] = useState({ page: 0, });
    const [rentals, setRentals] = useState([]);
    const [hasMore, setHasMore] = useState(true);

    const { ref, inView } = useInView({
        threshold: 0,
    });

    useEffect(() => {
        if (inView && hasMore) {
            setPage(prev => prev + 1);
        }
    }, [inView]);


    useEffect(() => {
        async function loadRatings() {
            const newRatings = await getRatings(page);

            const newProperties = await Promise.all(newRatings.data.map(async (rating) => {
                const property = await getProperty(rating.rentalId);
                return {
                    ...property,
                    rentalId: rating.rentalId,
                    userRating: rating.rating,
                    dateTime: rating.dateTime,
                };
            }))

            setRentals(prev => ([...prev, ...newProperties]));

            if (newRatings.pagination.nextPage === null) {
                setHasMore(false);
            }
        }

        loadRatings();
    }, [page]);

    return (
        <Box sx={{ bgcolor: 'custom.backgroundLight', minHeight: '100vh', py: 4 }}>
            <Container maxWidth="xl">
                <Typography variant="h4" sx={{ mb: 3, mt: 3, fontWeight: 600 }}>My Ratings</Typography>

                <Grid container spacing={3} sx={{ my: 3 }}>
                    {
                        rentals.map((curRental) => (
                            <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                                <RentalCard rental={curRental} />
                            </Grid>
                        ))
                    }
                </Grid>
                <Box ref={ref}></Box>
            </Container>
        </Box>
    );
}