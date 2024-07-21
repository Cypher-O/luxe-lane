
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import ProductList from '../components/ProductList';
// import ProductForm from '../components/ProductForm';
// import SearchBar from '../components/SearchBar';
// import Navbar from '../components/Navbar';
// import { Container, Typography, Paper, Fab, Box, CircularProgress } from '@mui/material';
// import { Add as AddIcon } from '@mui/icons-material';
// import { LoadingButton } from '@mui/lab';
// import { getProducts, searchProducts, createProduct, updateProduct, deleteProduct, logoutUser } from '../api';


// const Dashboard = () => {
//     const [selectedProduct, setSelectedProduct] = useState(null);
//     const [products, setProducts] = useState([]);
//     const [isFormOpen, setIsFormOpen] = useState(false);
//     const [message, setMessage] = useState('');
//     const [isLoading, setIsLoading] = useState(false);
//     const [loading, setLoading] = useState(false);
//     const [searchQuery, setSearchQuery] = useState('');

//     const navigate = useNavigate();

//     const username = localStorage.getItem('username');

//     const fetchProducts = async () => {
//       setIsLoading(true);
//       try {
//           const response = await getProducts();
//           setProducts(response.data);
//           setMessage('');
//       } catch (error) {
//           console.error('Error fetching products:', error);
//           setMessage('Error fetching products. Please try again.');
//       } finally {
//           setIsLoading(false);
//       }
//   };
//     useEffect(() => {
//         fetchProducts();
//     }, []);

//     const handleSelectProduct = (product) => {
//         setSelectedProduct(product);
//         setIsFormOpen(true);
//     };

//     const handleSave = async (productData) => {
//         try {
//             if (selectedProduct) {
//                 await updateProduct(selectedProduct._id, productData);
//             } else {
//                 await createProduct(productData);
//             }
//             await fetchProducts();
//             setSelectedProduct(null);
//             setIsFormOpen(false);
//         } catch (error) {
//             console.error('Error saving product:', error);
//             throw error;
//         }
//     };

//     const handleDelete = async (id) => {
//         try {
//             await deleteProduct(id);
//             await fetchProducts();
//         } catch (error) {
//             console.error('Error deleting product:', error);
//         }
//     };

//     const handleAddProduct = () => {
//       setSelectedProduct(null);
//       setIsFormOpen(true);
//     };

//     const handleFormClose = () => {
//         setIsFormOpen(false);
//         setSelectedProduct(null);
//     };

//     const handleSearch = async (query) => {
//       setSearchQuery(query);
//       setIsLoading(true);
//       try {
//           if (query) {
//               const response = await searchProducts(query);
//               console.log('API Response:', response); // Log the response to check its structure
  
//               // Check the exact structure of the response
//               const products = response.data || [];
//               const message = response.message || '';
  
//               if (products.length === 0) {
//                   setMessage(message || 'No products found matching your search.');
//               } else {
//                   setProducts(products);
//                   setMessage('');
//               }
//           } else {
//               await fetchProducts();
//           }
//       } catch (error) {
//           console.error('Error searching products:', error);
//           setMessage('Error searching products. Please try again.');
//       } finally {
//           setIsLoading(false);
//       }
//   };
  

//   //   const handleSearch = async (query) => {
//   //     setIsLoading(true);
//   //     try {
//   //         if (query) {
//   //             const response = await searchProducts(query);
//   //             setProducts(response.data);
//   //             if (response.data.length === 0) {
//   //                 setMessage('No products found matching your search.');
//   //             } else {
//   //                 setMessage('');
//   //             }
//   //         } else {
//   //             await fetchProducts();
//   //         }
//   //     } catch (error) {
//   //         console.error('Error searching products:', error);
//   //         setMessage('Error searching products. Please try again.');
//   //     } finally {
//   //         setIsLoading(false);
//   //     }
//   // };

//   const handleLogout = async () => {
//     setLoading(true);
//     await logoutUser();
//     localStorage.removeItem('token');
//     localStorage.removeItem('username');
//     navigate('/', { replace: true });
// };

//     return (
//         <Container>
//             <Navbar
//     username={username}
//     loading={loading}
//     onLogout={handleLogout}
//     searchQuery={searchQuery}
//     onSearch={handleSearch}
//     onSearchError={(error) => console.error('Search error:', error)}
//     />
//             {/* <Box 
//                 sx={{
//                     display: 'flex',
//                     justifyContent: 'space-between',
//                     alignItems: 'center',
//                     marginTop: 3,
//                     marginBottom: 3
//                 }}>
//                 <Typography variant="h4">
//                   CatalogCraft
//                 </Typography>
//                 <Typography component="h1" variant="h5">
//                     Hi, {username}!
//                 </Typography>
//                 <LoadingButton
//                         type="submit"
//                         fullWidth
//                         variant="contained"
//                         color="primary"
//                         loading={loading} 
//                         onClick={handleLogout}
//                         sx={{ mt: 3, mb: 2 }}>
//                         Logout
//                     </LoadingButton>
//                 <Box sx={{ width: '50%', maxWidth: '300px' }}>
//                     <SearchBar searchQuery={searchQuery} onSearch={handleSearch} />
//                 </Box>
//             </Box> */}

//             <Paper elevation={3} sx={{ padding: 3, marginBottom: 3, minHeight: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//                 {isLoading ? (
//                     <CircularProgress />
//                 ) : message ? (
//                     <Typography>{message}</Typography>
//                 ) : (
//                     <ProductList onSelect={handleSelectProduct} onDelete={handleDelete} products={products} />
//                 )}
//             </Paper>
//             <ProductForm
//                 open={isFormOpen}
//                 handleClose={handleFormClose}
//                 product={selectedProduct}
//                 onSave={handleSave}
//             />
//             <Fab
//                 color="primary"
//                 aria-label="add"
//                 onClick={handleAddProduct}
//                 sx={{
//                     position: 'fixed',
//                     bottom: 50,
//                     right: 30,
//                 }}
//             >
//                 <AddIcon />
//             </Fab>
//         </Container>
//     );
// };

// export default Dashboard;
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
    const [searchQuery, setSearchQuery] = useState('');

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
        setSearchQuery(query);
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
        <Container>
            <Navbar
                username={username}
                loading={loading}
                onLogout={handleLogout}
                onSearch={handleSearch}
                onSearchError={(error) => console.error('Search error:', error)}
            />
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
