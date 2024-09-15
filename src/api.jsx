// src/api.js
import axios from 'axios';

const API_URL = 'https://luxe-lane-server-side.cybercraftsmen.tech/api';
const PRODUCTS_URL = `${API_URL}/products`;
const AUTH_URL = `${API_URL}/auth`;

// Products API
export const getProducts = () => axios.get(PRODUCTS_URL);
export const getProductById = (id) => axios.get(`${PRODUCTS_URL}/${id}`);
export const createProduct = (product) => axios.post(`${PRODUCTS_URL}/product`, product);
export const updateProduct = (id, product) => axios.put(`${PRODUCTS_URL}/${id}`, product);
export const deleteProduct = (id) => axios.delete(`${PRODUCTS_URL}/${id}`);

export const searchProducts = async (name) => {
    try {
        const response = await axios.get(`${PRODUCTS_URL}/search`, {
            params: { name }
        });
        return response.data;
    } catch (error) {
        console.error('Error searching products:', error);
        throw error; 
    }
};

// Authentication API
export const loginUser = async (email, password) => {
    try {
        const response = await axios.post(`${AUTH_URL}/login`, { email, password });
        return response.data; // Return the response data, usually containing a JWT token
    } catch (error) {
        console.error('Error logging in:', error);
        throw error; 
    }
};

export const registerUser = async (username, email, password, confirmPassword) => {
    try {
        const response = await axios.post(`${AUTH_URL}/register`, { username, email, password, confirmPassword });
        return response.data; // Return the response data, usually a success message or user info
    } catch (error) {
        console.error('Error registering:', error);
        throw error; 
    }
};

export const logoutUser = async () => axios.post(`${AUTH_URL}/logout`);
