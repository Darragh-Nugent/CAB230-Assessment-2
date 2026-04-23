import { Box, Typography, Grid, Container } from "@mui/material";
import { useState, useEffect } from 'react';

import { useInView } from "react-intersection-observer";

import RentalCard from "./components/RentalCard";
import { getRatings } from "../../api/ratingApi";
import { getProperty } from "../../api/rentalApi";


export default function Ratings() {
    const [page, setPage] = useState({ page: 0, });
    const [rentals, setRentals] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const { ref, inView } = useInView({
        threshold: 0,
        rootMargin: "200px",

    });

    useEffect(() => {
        if (inView && hasMore && !loading) {
            setPage(
                prev => ({
                    ...prev,
                    page: prev.page + 1
                }));
        }
    }, [inView, loading]);


    useEffect(() => {
        async function loadRatings() {
            setLoading(true)
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

            // let filtered = newProperties.filter(property =>)
            setRentals(prev => ([...prev, ...newProperties]));

            if (newRatings.pagination.nextPage === null) {
                setHasMore(false);
            }

            setLoading(false);

        }

        loadRatings();
    }, [page]);

    return (
        <>
            <Box sx={{ bgcolor: 'custom.backgroundLight', minHeight: '120vh', py: 4 }}>
                <Container maxWidth="xl">
                    <Typography variant="h4" sx={{ mb: 3, mt: 3, fontWeight: 600 }}>My Ratings</Typography>

                    <Grid container spacing={3} sx={{ my: 3 }}>
                        {
                            rentals.map((curRental) => (
                                <Grid key={curRental.rentalId + curRental.dateTime} size={{ xs: 12, md: 6, lg: 4 }}>
                                    <RentalCard rental={curRental} />
                                </Grid>
                            ))
                        }

                        <Grid item xs={12}>
                            <Box ref={ref} sx={{ height: 20 }} />
                        </Grid>
                    </Grid>

                </Container>
            </Box>
        </>

    );
}