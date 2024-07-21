
import React, { useState, useEffect } from 'react';
import ProductList from '../components/ProductList';
import ProductForm from '../components/ProductForm';
import SearchBar from '../components/SearchBar';
import { Container, Typography, Paper, Fab, Box, CircularProgress } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { getProducts, searchProducts, createProduct, updateProduct, deleteProduct } from '../api';


const Dashboard = () => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [products, setProducts] = useState([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

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
      setSearchQuery(query);
      setIsLoading(true);
      try {
          if (query) {
              const response = await searchProducts(query);
              console.log('API Response:', response); // Log the response to check its structure
  
              // Check the exact structure of the response
              const products = response.data || [];
              const message = response.message || '';
  
              if (products.length === 0) {
                  setMessage(message || 'No products found matching your search.');
              } else {
                  setProducts(products);
                  setMessage('');
              }
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
  

  //   const handleSearch = async (query) => {
  //     setIsLoading(true);
  //     try {
  //         if (query) {
  //             const response = await searchProducts(query);
  //             setProducts(response.data);
  //             if (response.data.length === 0) {
  //                 setMessage('No products found matching your search.');
  //             } else {
  //                 setMessage('');
  //             }
  //         } else {
  //             await fetchProducts();
  //         }
  //     } catch (error) {
  //         console.error('Error searching products:', error);
  //         setMessage('Error searching products. Please try again.');
  //     } finally {
  //         setIsLoading(false);
  //     }
  // };

    return (
        <Container>
            <Box 
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: 3,
                    marginBottom: 3
                }}
            >
                <Typography variant="h4">
                  CatalogCraft
                </Typography>
                <Box sx={{ width: '50%', maxWidth: '300px' }}>
                    <SearchBar searchQuery={searchQuery} onSearch={handleSearch} />
                </Box>
            </Box>
            <Paper elevation={3} sx={{ padding: 3, marginBottom: 3, minHeight: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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