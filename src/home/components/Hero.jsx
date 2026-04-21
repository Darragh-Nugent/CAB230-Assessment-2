import React from 'react'
import { useNavigate, Link } from 'react-router-dom';

import { Typography, Box, Stack, Button, Container } from '@mui/material'

import HeroImage from '../../assets/login-house.jpg'

const Hero = () => {
    const navigate = useNavigate();

    return (
        <Container id="home" maxWidth={false} disableGutters>
            <Stack
                direction={{ xs: 'column', md: 'row' }}
                spacing={0}
                sx={{
                    width: '100%',
                    justifyContent: 'center'
                }}
            >
                <Box
                    sx={{
                        width: "50%",
                        margin: 0
                    }}
                >
                    <img src={HeroImage} alt="Image of house"
                        style={{
                            width: '100%',
                            display: 'block'
                        }}
                    />
                </Box>
                <Box
                    sx={{
                        width: { xs: "100%", md: "50%" },
                        padding: '3rem 0',
                        display: 'flex',
                        textAlign: 'left',
                        // display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        gap: '1.5rem',
                        backgroundColor: 'primary.main',
                        color: 'primary.contrastText'
                    }}
                >
                    <Stack
                        spacing={2}
                        sx={{
                            paddingLeft: "1em",
                        }}
                    >
                        <Typography variant="h1" sx={{ fontSize: { xs: '3rem', md: '4rem' } }}>
                            High Rise
                        </Typography>
                        <Typography variant='h4' sx={{ fontSize: { xs: '1rem', md: '1.5rem' } }}>
                            The perfect place for all your incredibly high priced needs.
                        </Typography>
                        <Box>
                            <Button
                                component={Link}
                                variant="contained"
                                color='secondary'
                                onClick={(event) => navigate(`/rentals/`)}
                            >
                                Browse Rentals
                            </Button>
                        </Box>
                    </Stack>
                </Box>
            </Stack>
        </Container>
    )
}

export default Hero
