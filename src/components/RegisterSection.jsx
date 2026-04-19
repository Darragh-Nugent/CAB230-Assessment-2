import { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';


import { Alert, Snackbar, Typography, Grid, Stack, Rating, Chip, Card, CardContent, FormControl, FormLabel, FormHelperText, TextField, Button } from "@mui/material";

import AlertBox from './AlertBox.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export default function RegisterSection() {
    const [email, setEmail] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');


    const [emailError, setEmailError] = useState(false);
    const [confirmEmailError, setConfirmEmailError] = useState(false);

    const [passwordError, setPasswordError] = useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);


    const [emailHelperText, setEmailHelperText] = useState('');
    const [confirmEmailHelperText, setConfirmEmailHelperText] = useState('');

    const [passwordHelperText, setPasswordHelperText] = useState('');
    const [confirmPasswordHelperText, setConfirmPasswordHelperText] = useState('');

    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();
    const { handleRegister } = useAuth();

    return (
        <>
            <AlertBox message={errorMessage} setMessage={setErrorMessage} severity={"error"}/>
        
            <Typography variant="h3" color="primary.main" sx={{ fontWeight: 600 }}>Register</Typography>

            <Stack spacing={2} alignItems="center" sx={{ mt: 2, flexWrap: "wrap" }}>
                <TextField
                    id="email"
                    label="Email"
                    error={emailError}
                    helperText={emailHelperText}
                    onChange={(e) => setEmail(e.target.value)}

                />

                <TextField
                    id="confirmEmail"
                    label="Confirm Email"
                    error={confirmEmailError}
                    helperText={confirmEmailHelperText}
                    onChange={(e) => setConfirmEmail(e.target.value)}

                />

                <TextField
                    id="password"
                    label="Password"
                    type="password"
                    error={passwordError}
                    helperText={passwordHelperText}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <TextField
                    id="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    error={confirmPasswordError}
                    helperText={confirmPasswordHelperText}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />

            </Stack>
            <Button variant="contained" size='large' fullWidth onClick={validateInputs} sx={{ mt: 3, py: 1.5 }}>
                Register and Sign in
            </Button>

            <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
                Already have an account? <Button variant='contained' onClick={() => navigate('/Login')}>Sign in</Button>
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

        if (email !== confirmEmail) {
            setConfirmEmailError(true);
            setConfirmEmailHelperText('Email addresses do not match');
            valid = false;
        } else {
            setConfirmEmailError(false);
            setConfirmEmailHelperText('');
        }

        if (password.length < 6) {
            setPasswordError(true);
            setPasswordHelperText('Password must be at least 6 characters long');
            valid = false;
        } else {
            setPasswordError(false);
            setPasswordHelperText('');
        }

        if (password !== confirmPassword) {
            setConfirmPasswordError(true);
            setConfirmPasswordHelperText('Passwords do not match');
            valid = false;
        } else {
            setConfirmPasswordError(false);
            setConfirmPasswordHelperText('');
        }

        if (valid) {
            try {
                await handleRegister(email, password);
                navigate('/');
            } catch (error) {
                console.error('Registration error:', error);
                setErrorMessage(error.message);
            };
        }
    }
}
