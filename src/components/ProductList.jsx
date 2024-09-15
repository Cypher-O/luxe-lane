import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box, useMediaQuery } from '@mui/material';
import { Edit, Trash2 } from 'lucide-react';
import { useTheme } from '@mui/material/styles';

const placeHolder = "https://media.istockphoto.com/id/1055079680/vector/black-linear-photo-camera-like-no-image-available.jpg?s=612x612&w=0&k=20&c=P1DebpeMIAtXj_ZbVsKVvg-duuL0v9DlrOZUvPG6UJk=";

const ProductList = ({ products, onSelect, onDelete }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Box sx={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: 2,
            justifyContent: 'center',
            width: '100%',
            padding: isMobile ? 1 : 2,
        }}>
            {products.map((product) => (
                <Card key={product._id} sx={{ 
                    width: isMobile ? '100%' : 'calc(50% - 16px)',
                    maxWidth: 345,
                    display: 'flex', 
                    flexDirection: 'column',
                    marginBottom: 2,
                }}>
                    <CardMedia
                        component="img"
                        height={isMobile ? "300" : "400"}
                        image={product.image || placeHolder}
                        alt={product.name}
                        sx={{ objectFit: 'cover' }}
                    />
                    <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                        <Typography gutterBottom variant="h6" component="div" noWrap>
                            {product.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flexGrow: 1 }}>
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
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Edit size={20} color='blue' onClick={() => onSelect(product)} style={{ marginRight: 8, cursor: 'pointer' }} />
                            <Trash2 size={20} color='red' onClick={() => onDelete(product._id)} style={{ cursor: 'pointer' }} />
                        </Box>
                    </CardContent>
                </Card>
            ))}
        </Box>
    );
};

export default ProductList;