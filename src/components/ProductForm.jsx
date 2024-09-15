import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Typography, CircularProgress, Snackbar, Dialog, DialogActions, DialogContent, DialogTitle, Container } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ProductForm = ({ open, handleClose, product, onSave }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        quantity: '',
        price: '',
        image: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    useEffect(() => {
        if (product) {
            setFormData(product);
        } else {
            setFormData({ name: '', description:'', quantity: '', price: '', image: '' });
        }
    }, [product]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        const { name, description, quantity, price, image } = formData;
        if (!name || !description || !quantity || !price || !image) {
            setSnackbarMessage('All fields are required.');
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
            return false;
        }
        return true;
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsLoading(true);
        try {
            await onSave(formData);
            setFormData({ name: '', description:'', quantity: '', price: '', image: '' });
            setSnackbarMessage('Product saved successfully!');
            setSnackbarSeverity('success');
            setOpenSnackbar(true);
            handleClose();
        } catch (error) {
            console.error('Error in form submission:', error);
            setSnackbarMessage('Error saving product. Please try again.');
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    return (
        <Container>
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>
        <Typography variant="h5" gutterBottom>
          {product ? 'Edit Product' : 'Add Product'}
        </Typography>
      </DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={4}>
                            <Grid item xs={12} sm={6} style={{marginTop: 10}}>
                                <TextField
                                    label="Product Name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} style={{marginTop: 10}}>
                                <TextField
                                    label="Product Quantity"
                                    name="quantity"
                                    type="number"
                                    value={formData.quantity}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} style={{marginTop: 10}}>
                                <TextField
                                    label="Description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Product Price"
                                    name="price"
                                    type="number"
                                    value={formData.price}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Product Image URL"
                                    name="image"
                                    value={formData.image}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                />
                            </Grid>
                        </Grid>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary" disabled={isLoading}>
                        Cancel
                    </Button>
                    <Button 
                        onClick={handleSubmit} 
                        variant="contained" 
                        color="primary"
                        disabled={isLoading}
                    >
                        {isLoading ? <CircularProgress size={24} /> : (product ? 'Update' : 'Add') + ' Product'}
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={openSnackbar} autoHideDuration={2000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default ProductForm;

