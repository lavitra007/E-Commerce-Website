import React, { createContext, useState } from 'react';

const genericImages = [
    "https://images.unsplash.com/photo-1605100804763-247f67b8548e?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1599643478514-4a4e0c4cd541?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800&auto=format&fit=crop"
];

const demoProducts = [
    { id: 1, name: "Diamond Signature Ring", price: 125000, category: "Fine Jewelry", image: genericImages[0], images: genericImages, stock: 5 },
    { id: 2, name: "Pearl Drop Earrings", price: 85000, category: "Earrings", image: genericImages[2], images: genericImages, stock: 12 },
    { id: 3, name: "Sapphire Tennis Bracelet", price: 210000, category: "Fine Jewelry", image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800&auto=format&fit=crop", images: ["https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800&auto=format&fit=crop", genericImages[1], genericImages[0]], stock: 3 },
    { id: 4, name: "Classic Gold Chain", price: 45000, category: "Daily Wear", image: genericImages[1], images: genericImages, stock: 25 },
    { id: 5, name: "Emerald Cut Pendant", price: 155000, category: "Fine Jewelry", image: "https://images.unsplash.com/photo-1599643478514-4a4e0c4cd541?q=80&w=800&auto=format&fit=crop", images: ["https://images.unsplash.com/photo-1599643478514-4a4e0c4cd541?q=80&w=800&auto=format&fit=crop", genericImages[0], genericImages[2]], stock: 8 },
    { id: 6, name: "Platinum Wedding Band", price: 95000, category: "Wedding", image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800&auto=format&fit=crop", images: ["https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800&auto=format&fit=crop", genericImages[1], genericImages[2]], stock: 15 },
    { id: 7, name: "Rose Gold Hoops", price: 55000, category: "Earrings", image: "https://images.unsplash.com/photo-1605100804763-247f67b8548e?q=80&w=800&auto=format&fit=crop", images: ["https://images.unsplash.com/photo-1605100804763-247f67b8548e?q=80&w=800&auto=format&fit=crop", genericImages[0], genericImages[1]], stock: 20 },
    { id: 8, name: "Bridal Statement Choker", price: 450000, category: "Wedding", image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800&auto=format&fit=crop", images: ["https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800&auto=format&fit=crop", genericImages[2], genericImages[0]], stock: 2 },
    { id: 9, name: "Diamond Solitaire Pendant", price: 185000, category: "Fine Jewelry", image: genericImages[0], images: genericImages, stock: 10 }
];

export const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [products] = useState(demoProducts);

    const addToCart = (product) => {
        setCart((prev) => {
            const exists = prev.find(item => item.id === product.id);
            if (exists) {
                return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (id) => {
        setCart((prev) => prev.filter(item => item.id !== id));
    };

    const updateQuantity = (id, newQuantity) => {
        if (newQuantity < 1) {
            removeFromCart(id);
            return;
        }
        setCart((prev) => prev.map(item => item.id === id ? { ...item, quantity: newQuantity } : item));
    };

    const toggleWishlist = (product) => {
        setWishlist((prev) => {
            const exists = prev.find(item => item.id === product.id);
            if (exists) {
                return prev.filter(item => item.id !== product.id);
            }
            return [...prev, product];
        });
    };

    return (
        <ShopContext.Provider value={{ products, cart, wishlist, addToCart, removeFromCart, updateQuantity, toggleWishlist }}>
            {children}
        </ShopContext.Provider>
    );
};
