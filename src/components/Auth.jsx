// src/components/Auth.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Typography, Box, Link, Snackbar, Alert } from '@mui/material';
import { Slide } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { loginUser, registerUser } from '../api';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    const navigate = useNavigate();

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const showSnackbar = (message, severity = 'success') => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setSnackbarOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); 

        try {
            if (isLogin) {
                // Perform login
                const response = await loginUser(email, password);
                localStorage.setItem('token', response.token);
                localStorage.setItem('username', response.username);
                showSnackbar('Login successful');
                // Navigate to dashboard
                navigate('/dashboard', { replace: true });
                // setTimeout(() => navigate('/dashboard', { replace: true }), 1000);
            } else {
                // Perform signup
                const response = await registerUser(username, email, password, confirmPassword);
                localStorage.setItem('token', response.token);
                localStorage.setItem('username', response.username);
                showSnackbar('Signup successful');
                // Navigate to dashboard
                navigate('/dashboard', { replace: true });
                // setTimeout(() => navigate('/dashboard', { replace: true }), 1000);
            }
        } catch (err) {
            showSnackbar(
                err.response?.data?.message || (isLogin ? 'Login failed' : 'Signup failed'),
                'error'
            );
        }
        finally {
            setLoading(false); 
        }
    };

    return (
        <Container maxWidth="xs">
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                minHeight="100vh"
            >
                <Typography variant="h4" gutterBottom>
                    {isLogin ? 'Login' : 'Signup'}
                </Typography>
                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                {!isLogin && (
                        <TextField
                            label="Username"
                            type="username"
                            fullWidth
                            margin="normal"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    )}
                    <TextField
                        label="Email"
                        type="email"
                        fullWidth
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <TextField
                        label="Password"
                        type="password"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {!isLogin && (
                        <TextField
                            label="Confirm Password"
                            type="password"
                            fullWidth
                            margin="normal"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        /> )}
                    <LoadingButton
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        loading={loading} 
                        sx={{ mt: 3, mb: 2 }}
                    >
                        {isLogin ? 'Login' : 'Register'}
                    </LoadingButton>
                </form>
                <Box mt={2}>
                    <Typography>
                        {isLogin ? (
                            <>
                                Don't have an account?{' '}
                                <Link
                                    component="button"
                                    variant="body2"
                                    onClick={() => setIsLogin(false)}
                                >
                                    Register
                                </Link>
                            </>
                        ) : (
                            <>
                                Already have an account?{' '}
                                <Link
                                    component="button"
                                    variant="body2"
                                    onClick={() => setIsLogin(true)}
                                >
                                    Login
                                </Link>
                            </>
                        )}
                    </Typography>
                </Box>
                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={6000}
                    onClose={handleSnackbarClose}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    TransitionComponent={(props) => <Slide {...props} direction="left" />}
                >
                    <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
                        {snackbarMessage}
                    </Alert>
                </Snackbar>
            </Box>
        </Container>
    );
};

export default Auth;
