import { useState, useEffect, createContext } from 'react';
import { Box, Container, Typography, Grid, Stack, Rating, Chip, Card, CardContent } from "@mui/material";

import AlertBox from "../components/AlertBox.jsx";

export default function PropertyRating({propertyId, defaultRating}) {
    const [rating, setRating] = useState(defaultRating);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('');

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

    return (
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