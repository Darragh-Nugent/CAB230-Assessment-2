import { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { Box, Container, Typography, Grid, Stack, Rating, Chip, Card, CardContent, FormControl, FormLabel, FormHelperText, TextField, Button } from "@mui/material";

import { useAuth } from '../context/AuthContext.jsx';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const [emailHelperText, setEmailHelperText] = useState('');
    const [passwordHelperText, setPasswordHelperText] = useState('');

    const navigate = useNavigate();
    const { handleLogin } = useAuth();

    async function validateInputs() {
        let valid = true;

        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!re.test(String(email).toLowerCase())) {
            setEmailError(true);
            setEmailHelperText('Please enter a valid email address');
            valid = false;
        } else {
            setEmailError(false);
            setEmailHelperText('');
        }

        if (password.length < 6) {
            setPasswordError(true);
            setPasswordHelperText('Password must be at least 6 characters long');
            valid = false;
        } else {
            setPasswordError(false);
            setPasswordHelperText('');
        }

        if (valid) {
            await handleLogin(email, password)
                .catch(error => {
                    console.error('Login error:', error);;
                });
            navigate('/');
        }
    }

    return (
        <Container maxWidth="xl">
            <Card sx={{ height: "100%", bgcolor: 'custom.card', borderRadius: 3 }}>
                <CardContent>
                    <Typography variant="h3" color="primary.main" sx={{ fontWeight: 600 }}>Login</Typography>

                    <FormControl>
                        <FormLabel>Email</FormLabel>
                        <TextField
                            id="email"
                            label="Email"
                            error={emailError}
                            helperText={emailHelperText}
                            onChange={(e) => setEmail(e.target.value)}

                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Password</FormLabel>
                        <TextField
                            id="password"
                            label="Password"
                            type="password"
                            error={passwordError}
                            helperText={passwordHelperText}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </FormControl>

                    <Button variant="contained" color="primary" onClick={validateInputs}>
                        Sign in
                    </Button>
                </CardContent>
            </Card>
        </Container>
    );
}

