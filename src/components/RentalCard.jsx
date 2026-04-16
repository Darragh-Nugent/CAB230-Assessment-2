import { Box, Rating, Typography, Grid, Card, CardContent, Container, Stack } from "@mui/material";


export default function RentalCard( {rental} )
{
    return (
        <Card sx={{ height: "100%", bgcolor: 'custom.card', borderRadius: 3 }}>
            <CardContent>
                <Stack spacing={2} sx={{ mt: 2, flexWrap: "wrap" }}>
                    <Typography variant="h6" color="primary.main">{rental.title}</Typography>

                    <Typography variant="body1" color="text.secondary">{rental.streetAddress}, {rental.suburb} {rental.postcode}</Typography>

                    <Rating
                        value={rental.userRating}
                        precision={1}
                        readOnly
                    />

                    <Typography variant="body1" color="text.secondary">Rated on {new Date(rental.dateTime).getDate()}</Typography>
                </Stack>
            </CardContent>
        </Card>
    );
}