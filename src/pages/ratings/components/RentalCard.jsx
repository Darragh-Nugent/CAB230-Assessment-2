import { useNavigate } from 'react-router-dom';

import { Rating, Typography, Card, CardContent, Stack } from "@mui/material";
import BedIcon from '@mui/icons-material/Bed';
import BathroomIcon from '@mui/icons-material/Bathroom';
import GarageIcon from '@mui/icons-material/Garage';

export default function RentalCard({ rental }) {
    const navigate = useNavigate();

    return (
        <Card
            onClick={() => navigate(`/rentals/${rental.rentalId}`)}
            sx={{
                height: "100%",
                bgcolor: 'custom.card',
                borderRadius: 3,
                transition: "0.2s",
                '&:hover': {
                    transform: "translateY(-4px)",
                    boxShadow: 6,
                    cursor: "pointer"
                }
            }}>
            <CardContent>
                <Stack spacing={2} sx={{ mt: 2, flexWrap: "wrap" }}>
                    <Typography variant="h5" color="primary.main" sx={{ fontWeight: 600 }}>${rental.rent}</Typography>

                    <Typography variant="h6" color="primary.main" sx={{ fontWeight: 500 }}>{rental.title}</Typography>

                    <Typography variant="body2" color="text.secondary">{rental.streetAddress}, {rental.suburb} {rental.postcode}</Typography>

                    <Stack direction="row" spacing={3} sx={{ mt: 2 }}>
                        <Stack direction="row" spacing={0.5}>
                            <BedIcon fontSize="small" aria-label='Bedrooms' />
                            <Typography>{rental.bedrooms}</Typography>
                        </Stack>

                        <Stack direction="row" spacing={0.5}>
                            <BathroomIcon fontSize="small" aria-label='Bathrooms' />
                            <Typography>{rental.bathrooms}</Typography>
                        </Stack>

                        <Stack direction="row" spacing={0.5}>
                            <GarageIcon fontSize="small" aria-label='Parking Spaces'/>
                            <Typography>{rental.parkingSpaces}</Typography>
                        </Stack>
                    </Stack>

                    <Rating
                        value={rental.userRating}
                        precision={1}
                        readOnly
                    />

                    <Typography variant="caption" color="text.secondary">Rated on {new Date(rental.dateTime).toLocaleDateString()}</Typography>
                </Stack>
            </CardContent>
        </Card>
    );
}