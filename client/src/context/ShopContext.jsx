import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../config';

export const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`${BASE_URL}/api/products`);
            
            // Map of distinct images for categories to ensure variety and no blank images
            const catImgPool = {
                'fine jewelry': [
                    'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1515562141207-7a8efbfc3473?q=80&w=800&auto=format&fit=crop'
                ],
                'daily wear': [
                    'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1573408301145-b98c4af06c8e?q=80&w=800&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1617264761033-0c4f826359f1?q=80&w=800&auto=format&fit=crop'
                ],
                'wedding': [
                    'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=800&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1515562141207-7a8efbfc3473?q=80&w=800&auto=format&fit=crop'
                ],
                'earrings': [
                    'https://images.unsplash.com/photo-1635767798638-3e25273a8236?q=80&w=800&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800&auto=format&fit=crop'
                ],
                'exclusive release': [
                    'https://images.unsplash.com/photo-1599643477877-537ef5278482?q=80&w=800&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800&auto=format&fit=crop'
                ],
                'fashion': [
                    'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800&auto=format&fit=crop'
                ]
            };
            const defaultPool = [
                'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800&auto=format&fit=crop'
            ];

            const enrichedProducts = data.map((product, idx) => {
                const cat = (product.category || '').toLowerCase();
                const pool = catImgPool[cat] || defaultPool;
                const selectedImg = pool[idx % pool.length];
                
                return {
                    ...product,
                    image: selectedImg,
                    images: [selectedImg] // ensures ProductDetail shows the image
                };
            });
            
            // If very few products are returned (e.g., blank pages), let's duplicate them to fill the UI
            let finalProducts = enrichedProducts;
            if (finalProducts.length > 0 && finalProducts.length < 8) {
                const clones = finalProducts.map((p, i) => ({
                    ...p, 
                    _id: p._id + '-clone-' + i, 
                    name: p.name + ' (Variant)',
                    image: (catImgPool[(p.category || '').toLowerCase()] || defaultPool)[(i+1) % 2],
                    images: [(catImgPool[(p.category || '').toLowerCase()] || defaultPool)[(i+1) % 2]]
                }));
                finalProducts = [...finalProducts, ...clones];
            }

            setProducts(finalProducts);
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const getCartId = (item) => `${item._id}-${item.selectedSize || ''}-${item.selectedColor || ''}`;

    const addToCart = (product) => {
        setCart((prev) => {
            const productCartId = getCartId(product);
            const exists = prev.find(item => getCartId(item) === productCartId);
            if (exists) {
                return prev.map(item => getCartId(item) === productCartId ? { ...item, quantity: item.quantity + 1 } : item);
            }
            return [...prev, { ...product, quantity: 1, cartItemId: productCartId }];
        });
    };

    const removeFromCart = (cartItemId) => {
        setCart((prev) => prev.filter(item => getCartId(item) !== cartItemId));
    };

    const updateQuantity = (cartItemId, newQuantity) => {
        if (newQuantity < 1) {
            removeFromCart(cartItemId);
            return;
        }
        setCart((prev) => prev.map(item => getCartId(item) === cartItemId ? { ...item, quantity: newQuantity } : item));
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
