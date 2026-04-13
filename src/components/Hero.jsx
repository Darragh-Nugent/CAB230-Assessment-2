import React from 'react'
import { Typography, Box, Stack, Button, Container } from '@mui/material'
import SadGuy from '../assets/sad_guy2.jpg'

const Hero = () => {
    return (
        <Container id="home" maxWidth={false} disableGutters>
            <Stack
                direction={{ xs: 'column', md: 'row' }}
                spacing={2}
                sx={{
                    width: '100%',
                    justifyContent: 'center'
                }}
            >

                <Box
                    sx={{
                        width: "50%",
                    }}
                >
                    <img src={SadGuy} alt="sad fella"
                        style={{ width: '100%' }}
                    />
                </Box>
                <Box
                    sx={{
                        width: { xs: "100%", md: "50%" }, // Ensure this Box takes 50% of the width
                        padding: '3rem 0',
                        display: 'flex',
                        textAlign: 'left',
                        // display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        gap: '.5rem',
                        backgroundColor: 'primary.main'
                    }}
                >
                    <Typography variant="h1" sx={{ fontSize: { xs: '3rem', md: '4rem' } }}>Coffee For All</Typography>
                    <Typography variant='h4' sx={{ fontSize: { xs: '1rem', md: '1.5rem' } }}>
                        The coffee revolution starts now.
                    </Typography>
                    <Button variant="contained" color='secondary' href="#coffee">Order Now</Button>
                </Box>

            </Stack>

        </Container>
    )
}

export default Hero
