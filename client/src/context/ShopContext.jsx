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
            
            const luxuryNaming = {
                'Fashion': [
                    { name: "Aurora Gold Link", desc: "A contemporary masterpiece featuring hand-polished gold links for the modern fashionista." },
                    { name: "Seraphina Velvet Choker", desc: "Exquisite velvet paired with a central sapphire, defining timeless elegance." },
                    { name: "Midnight Bangle Set", desc: "Dusk-inspired dark chrome bangles with subtle diamond encrustations." },
                    { name: "Azure Coast Signet", desc: "Inspired by the Mediterranean, this ring features a deep turquoise stone." }
                ],
                'Daily Wear': [
                    { name: "Lumina Gold Studs", desc: "Understated brilliance for everyday wear. Perfectly balanced and lightweight." },
                    { name: "Petite Infinity Band", desc: "A delicate symbol of forever, crafted in 18k rose gold." },
                    { name: "Classic Solstice Chain", desc: "The foundation of every jewelry collection. A sleek, versatile gold chain." },
                    { name: "Minimalist Pearl Drop", desc: "A single freshwater pearl suspended from a fine silver wire." }
                ],
                'Fine Jewelry': [
                    { name: "Celestial Diamond Halo", desc: "A breathtaking center stone surrounded by a constellation of brilliant diamonds." },
                    { name: "Royal Emerald Pendant", desc: "A majestic pear-cut emerald set in a vintage-inspired platinum frame." },
                    { name: "Astrid Sapphire Band", desc: "Deep blue sapphires alternated with diamonds in a modern channel setting." },
                    { name: "Legacy Heirloom Locket", desc: "Hand-engraved gold locket designed to hold your most precious memories." }
                ],
                'Earrings': [
                    { name: "Cascade Crystal Drops", desc: "Light-catching crystals that move with you, creating a shimmering waterfall effect." },
                    { name: "Orion Starburst Studs", desc: "Inspired by the night sky, these studs feature a brilliant central diamond." },
                    { name: "Radiance Ear Jackets", desc: "Versatile design that adds a modern edge to the classic diamond stud." },
                    { name: "Infinite Loop Hoops", desc: "Seamless gold hoops that represent the beauty of continuity." }
                ],
                'Wedding': [
                    { name: "Eternal Vow Platinum Band", desc: "Symbolize your commitment with this timeless, high-polish platinum band." },
                    { name: "Graceful Solitaire Ring", desc: "The ultimate expression of love, featuring a hand-selected brilliant cut diamond." },
                    { name: "Amour Diamond Set", desc: "A perfectly matched set of earrings and pendant for your special day." },
                    { name: "Infinity Knot Wedding Band", desc: "Woven gold bands representing two lives becoming one." }
                ],
                'Exclusive Release': [
                    { name: "Supernova Galactic Cuff", desc: "A bold statement piece featuring rare cosmic-hued gemstones." },
                    { name: "Nebula Aura Necklace", desc: "Iridescent opals set in a fluid, sculptural gold frame." },
                    { name: "The Farout Sovereign", desc: "Our signature piece. A masterpiece of craftsmanship and rare materials." },
                    { name: "Eclipse Obsidian Signet", desc: "Carved volcanic glass set in brushed gunmetal for a striking look." }
                ]
            };

            coreCategories.forEach((catName, idx) => {
                const searchNorm = normCat(catName);
                const existing = finalProducts.filter(p => normCat(p.category) === searchNorm);
                
                // If category is missing or sparse, seed it with high-end items
                if (existing.length < 4) {
                    const categoryPool = luxuryNaming[catName] || luxuryNaming['Fashion'];
                    for (let i = existing.length; i < 4; i++) {
                        const newId = `seed-${searchNorm}-${i}`;
                        const img = verifiedImgs[(idx + i) % verifiedImgs.length];
                        const nameObj = categoryPool[i % categoryPool.length];
                        
                        finalProducts.push({
                            _id: newId,
                            name: nameObj.name,
                            description: nameObj.desc,
                            price: 25000 + (Math.floor(Math.random() * 150000)),
                            category: catName,
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
