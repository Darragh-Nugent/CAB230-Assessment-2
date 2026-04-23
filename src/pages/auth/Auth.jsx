import { useLocation } from 'react-router-dom';

import { Box, Container, Grid, Card, CardContent } from "@mui/material";

import LoginSection from './components/LoginSection.jsx';
import RegisterSection from './components/RegisterSection.jsx';

import loginImage from '../../../assets/login-house.jpg';

export default function Auth() {
    const location = useLocation();

    return (
        <Box sx={{ bgcolor: 'custom.backgroundLight', minHeight: '100vh', py: 4 }}>
            <Container maxWidth="md" align="center" sx={{ mt: 5 }}>
                <Card sx={{ height: "100%", bgcolor: 'custom.card', borderRadius: 3 }}>
                    <CardContent>
                        <Grid container spacing={2}>
                            <Grid size={{ xs: 12, md: 7 }}>
                                <Box
                                    component="img"
                                    src={loginImage}
                                    alt="Image of beautiful house"
                                    sx={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                        borderRadius: 3,
                                    }}
                                >
                                </Box>
                            </Grid>
                            <Grid size={{ xs: 12, md: 5 }}>
                                {location.pathname === '/Login' ? <LoginSection /> : <RegisterSection />}
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Container >
        </Box>
    );
}

