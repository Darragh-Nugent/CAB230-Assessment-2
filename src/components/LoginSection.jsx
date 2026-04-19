import { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';


import { Box, Container, Typography, Grid, Stack, Rating, Chip, Card, CardContent, FormControl, FormLabel, FormHelperText, TextField, Button } from "@mui/material";

import { useAuth } from '../context/AuthContext.jsx';
import AlertBox from './AlertBox.jsx';

export default function LoginSection() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const [emailHelperText, setEmailHelperText] = useState('');
    const [passwordHelperText, setPasswordHelperText] = useState('');

    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();
    const { handleLogin } = useAuth();

    return (
        <>
            <AlertBox message={errorMessage} setMessage={setErrorMessage} severity={"error"} />

            <Typography variant="h3" color="primary.main" sx={{ fontWeight: 600 }}>Login</Typography>

            <Stack spacing={2} alignItems="center" sx={{ mt: 2, flexWrap: "wrap" }}>
                <TextField
                    id="email"
                    label="Email"
                    error={emailError}
                    helperText={emailHelperText}
                    onChange={(e) => setEmail(e.target.value)}

                />

                <FormLabel>Password</FormLabel>
                <TextField
                    id="password"
                    label="Password"
                    type="password"
                    error={passwordError}
                    helperText={passwordHelperText}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </Stack>
            <Button variant="contained" size='large' fullWidth onClick={validateInputs} sx={{ mt: 3, py: 1.5 }}>
                Sign in
            </Button>

            <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
                Don't have an account? <Button variant='contained' onClick={() => navigate('/Register')}>Sign up</Button>
            </Typography>
        </>
    );

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
            try {
                await handleLogin(email, password);
                navigate('/');
            } catch (error) {
                console.error('Login error:', error);
                setErrorMessage(error.message);
            };
        }
    }
}

