import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductList from '../components/ProductList';
import ProductForm from '../components/ProductForm';
import Navbar from '../components/Navbar';
import { Container, Typography, Paper, Fab, CircularProgress } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { getProducts, searchProducts, createProduct, updateProduct, deleteProduct, logoutUser } from '../api';

const Dashboard = () => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [products, setProducts] = useState([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    // const [searchQuery, setSearchQuery] = useState('');

    const navigate = useNavigate();
    const username = localStorage.getItem('username');

    const fetchProducts = async () => {
        setIsLoading(true);
        try {
            const response = await getProducts();
            setProducts(response.data);
            setMessage('');
        } catch (error) {
            console.error('Error fetching products:', error);
            setMessage('Error fetching products. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleSelectProduct = (product) => {
        setSelectedProduct(product);
        setIsFormOpen(true);
    };

    const handleSave = async (productData) => {
        try {
            if (selectedProduct) {
                await updateProduct(selectedProduct._id, productData);
            } else {
                await createProduct(productData);
            }
            await fetchProducts();
            setSelectedProduct(null);
            setIsFormOpen(false);
        } catch (error) {
            console.error('Error saving product:', error);
            throw error;
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteProduct(id);
            await fetchProducts();
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const handleAddProduct = () => {
        setSelectedProduct(null);
        setIsFormOpen(true);
    };

    const handleFormClose = () => {
        setIsFormOpen(false);
        setSelectedProduct(null);
    };

    const handleSearch = async (query) => {
        console.log('handleSearch called with query:', query);
        // setSearchQuery(query);
        setIsLoading(true);
        try {
            if (query) {
                const response = await searchProducts(query);
                console.log('API Response:', response);

                const products = Array.isArray(response) ? response : [];
                console.log('Products to be set:', products);

                setProducts(products);
                setMessage(products.length === 0 ? 'No products found matching your search.' : '');
            } else {
                await fetchProducts();
            }
        } catch (error) {
            console.error('Error searching products:', error);
            setMessage('Error searching products. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = async () => {
        setLoading(true);
        await logoutUser();
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        navigate('/', { replace: true });
    };

    return (
        <Container maxWidth={false}
        disableGutters 
        sx={{ 
          width: '100vw', 
          maxWidth: '100%', 
          px: 0,
          overflow: 'hidden'
        }}>
            <Navbar
                username={username}
                loading={loading}
                onLogout={handleLogout}
                onSearch={handleSearch}
                onSearchError={(error) => console.error('Search error:', error)}
            />
            <Paper elevation={3} sx={{width: '100%', padding: 3, marginBottom: 3, minHeight: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center',
  boxSizing: 'border-box' }}>
                {isLoading ? (
                    <CircularProgress />
                ) : message ? (
                    <Typography>{message}</Typography>
                ) : (
                    <ProductList onSelect={handleSelectProduct} onDelete={handleDelete} products={products} />
                )}
            </Paper>
            <ProductForm
                open={isFormOpen}
                handleClose={handleFormClose}
                product={selectedProduct}
                onSave={handleSave}
            />
            <Fab
                color="primary"
                aria-label="add"
                onClick={handleAddProduct}
                sx={{
                    position: 'fixed',
                    bottom: 50,
                    right: 30,
                }}
            >
                <AddIcon />
            </Fab>
        </Container>
    );
};

export default Dashboard;
