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
            
            // Verified high-end imagery from Unsplash
            const verifiedImgs = [
                'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1599643477877-537ef5278482?q=80&w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1617264761033-0c4f826359f1?q=80&w=800&auto=format&fit=crop'
            ];

            // Normalize category helper
            const normCat = (c) => (c || '').toLowerCase().replace(/[^a-z0-9]/g, '');

            const enrichedProducts = data.map((product, idx) => {
                const selectedImg = verifiedImgs[idx % verifiedImgs.length];
                // Force a valid image if the current one is missing or not a full URL
                const hasGoodImg = product.image && product.image.startsWith('http');
                const finalImg = hasGoodImg ? product.image : selectedImg;
                
                return {
                    ...product,
                    image: finalImg,
                    images: (product.images && product.images.length > 0 && product.images[0].startsWith('http')) 
                        ? product.images 
                        : [finalImg]
                };
            });
            
            // Core categories as defined in Navbar and UI
            const coreCategories = ['Fashion', 'Daily Wear', 'Fine Jewelry', 'Earrings', 'Wedding', 'Exclusive Release'];
            let finalProducts = [...enrichedProducts];
            
            coreCategories.forEach((catName, idx) => {
                const searchNorm = normCat(catName);
                const existing = finalProducts.filter(p => normCat(p.category) === searchNorm);
                
                // If category is missing or sparse, seed it with high-end items
                if (existing.length < 4) {
                    for (let i = existing.length; i < 4; i++) {
                        const newId = `seed-${searchNorm}-${i}`;
                        const img = verifiedImgs[(idx + i) % verifiedImgs.length];
                        finalProducts.push({
                            _id: newId,
                            name: `Lux ${catName} Piece ${i + 1}`,
                            description: `A stunning masterpiece from our ${catName} collection. Exclusively designed for the sophisticated palette.`,
                            price: 25000 + (Math.floor(Math.random() * 150000)),
                            category: catName, // Keep original name for display
                            image: img,
                            images: [img],
                            stock: 10,
                            sizes: ['US 6', 'US 7', 'US 8'],
                            colors: ['Gold', 'Platinum']
                        });
                    }
                }
            });

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
