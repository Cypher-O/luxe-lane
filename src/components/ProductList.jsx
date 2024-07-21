import React from 'react';
import { Card, CardContent, CardMedia, Typography, Grid, IconButton, Box } from '@mui/material';
import { Edit, Trash2 } from 'lucide-react';

const placeHolder = "https://media.istockphoto.com/id/1055079680/vector/black-linear-photo-camera-like-no-image-available.jpg?s=612x612&w=0&k=20&c=P1DebpeMIAtXj_ZbVsKVvg-duuL0v9DlrOZUvPG6UJk=";

const ProductList = ({ products, onSelect, onDelete }) => {
    return (
        <Grid container spacing={3}>
            {products.map((product) => (
                <Grid item xs={12} sm={6} md={4} key={product._id}  style={{marginBottom: 30}}>
                    <Card sx={{ maxWidth: 345, display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <CardMedia
                            component="img"
                            height="400"
                            image={product.image || placeHolder}
                            alt={product.name}
                            sx={{ objectFit: 'cover' }}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div" sx={{mb: 1}}>
                                {product.name}
                            </Typography>
                            <Typography gutterBottom variant="body1" color="text.secondary" sx={{mb:3, }}>
                                {product.description}
                            </Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                <Typography variant="body2" color="text.secondary">
                                    Price: ${product.price}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Quantity: {product.quantity}
                                </Typography>
                            </Box>
                            <Box sx={{ marginTop: 'auto', display: 'flex', justifyContent: 'flex-end' }}>
                                <IconButton onClick={() => onSelect(product)} aria-label="edit" size="small" sx={{ mr: 1 }}>
                                    <Edit size={20} color='blue' />
                                </IconButton>
                                <IconButton onClick={() => onDelete(product._id)} aria-label="delete" size="small">
                                    <Trash2 size={20} color='red' />
                                </IconButton>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default ProductList;

