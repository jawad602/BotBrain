"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
// import Grow, { GrowProps } from '@mui/material/Grow';
// import { TransitionProps } from '@mui/material/transitions';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import handleError from '@/utils/handleError';

export default function Login() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const router = useRouter();
    const displaySnackBar = () => {
        setSnackBarContent("Password and Confirm password are same")
        setSnackBar(true);
        setTimeout(() => setSnackBar(false), 1500);
    }

    const handleSignup = async (event) => {
        event.preventDefault();
        if (password != confirmPassword) {
            displaySnackBar();
            return
        }

        try {
            let response = await fetch('/api/user/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });
            let jsonResponse = await response.json();
            if (!response.ok) {
                // console.log("Hallo")
                throw new Error(jsonResponse);
            }
            console.log('ajkhska')
            router.push("login");
            console.log(response);
        } catch (error) {
            console.log("🚀 ~ handleSignup ~ error:", error)

        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    Sign Up
                </Typography>
                <Box component="form" onSubmit={handleSignup} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Name"
                        name="name"
                        autoComplete="name"
                        autoFocus
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="confirm_password"
                        label="Confirm Password"
                        type="password"
                        id="confirm_password"
                        autoComplete="current-password"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                    />
                    <Typography variant="body2" color="text.secondary" align="left">
                        Already have an account? <Link href="/login">Sign in</Link>
                    </Typography>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign Up
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}
