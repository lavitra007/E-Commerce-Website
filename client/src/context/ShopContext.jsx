import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/products`);
            setProducts(data);
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const addToCart = (product) => {
        setCart((prev) => {
            const exists = prev.find(item => item._id === product._id);
            if (exists) {
                return prev.map(item => item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item);
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (id) => {
        setCart((prev) => prev.filter(item => item._id !== id));
    };

    const updateQuantity = (id, newQuantity) => {
        if (newQuantity < 1) {
            removeFromCart(id);
            return;
        }
        setCart((prev) => prev.map(item => item._id === id ? { ...item, quantity: newQuantity } : item));
    };

    const toggleWishlist = (product) => {
        setWishlist((prev) => {
            const exists = prev.find(item => item._id === product._id);
            if (exists) {
                return prev.filter(item => item._id !== product._id);
            }
            return [...prev, product];
        });
    };

    return (
        <ShopContext.Provider value={{ products, cart, wishlist, loading, addToCart, removeFromCart, updateQuantity, toggleWishlist, fetchProducts }}>
            {children}
        </ShopContext.Provider>
    );
};
