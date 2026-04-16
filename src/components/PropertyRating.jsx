import { useState, useEffect, createContext } from 'react';
import { Box, Container, Typography, Grid, Stack, Rating, Chip, Card, CardContent } from "@mui/material";

import AlertBox from "../components/AlertBox.jsx";
import { getRating, postRating } from "../models/RatingModel.js"

export default function PropertyRating({ propertyId, defaultRating }) {
    const [rating, setRating] = useState(defaultRating);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('');
    const [loading, setLoading] = useState(true);

    async function handleRating(newRating) {
        try {
            await postRating(propertyId, newRating);
            setRating(newRating);
            setMessage("Rating saved");
            setSeverity("success");

        } catch (err) {
            setMessage(err.message);
            setSeverity("error");
        }
    }

    useEffect(() => {
        async function loadRating() {
            try {
                let response = await getRating(propertyId);
                setRating(response.rating);
            } catch (err) {
                console.error(err.message)
            } finally {
                setLoading(false)
            }
        }
        loadRating();
    }, []);

    return (
        loading ? null :
        <>
            <AlertBox message={message} setMessage={setMessage} severity={severity} />

            <Rating
                value={rating}
                precision={1}
                onChange={(event, newRating) => handleRating(newRating)}
            />
        </>

    );
}