"use client";
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function Add() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState()
    const [youtubeUrl, setYoutubeUrl] = useState();
    const [author, setAuthor] = useState();
    const router = useRouter();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            let response = await fetch('/api/course/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, description, youtubeUrl, author }),
            });
            let jsonResponse = await response.json();
            console.log(jsonResponse)
            console.log(response)
            if (!response.ok) {
                throw new Error(response);
            }

            router.push('all')
        } catch (error) {
            console.log(error)
        }
    }
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
                    Add Course
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="title"
                        label="title"
                        name="title"
                        autoComplete="title"
                        autoFocus
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="description"
                        label="Description"
                        name="description"
                        autoComplete="description"
                        autoFocus
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="youtubeUrl"
                        label="Youtube URL"
                        type="youtubeUrl"
                        id="youtubeUrl"
                        autoComplete="youtubeUrl"
                        value={youtubeUrl}
                        onChange={e => setYoutubeUrl(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="author"
                        label="Author"
                        type="author"
                        id="author"
                        autoComplete="author"
                        value={author}
                        onChange={e => setAuthor(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Add
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}