'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { Container, TextField, Button, Typography, Box } from '@mui/material';

export default function ActivateEmail() {
    const [securityCode, setSecurityCode] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const id = localStorage.getItem("id");
        try {
            let response = await fetch('/api/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({securityCode, id }),
            });
            console.log(response);
            response = await response.json();
            if(response.ok) {
                console.log("Hallo")
                router.push('/signup');
            }
            console.log(response);
        } catch (error) {
            console.log("🚀 ~ handleLogin ~ error:", error)

        }
        // Implement your login logic here
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
                    Activate Email
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="securityCode"
                        label="Security Code"
                        type="text"
                        id="securityCode"
                        autoComplete="current-password"
                        value={securityCode}
                        onChange={e => setSecurityCode(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}
