import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { FiHeart } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, wishlist, toggleWishlist } = useContext(ShopContext);
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('userInfo');
        if (storedUser) {
            setUserInfo(JSON.parse(storedUser));
        }
    }, []);

    if (!userInfo) {
        return (
            <div style={{ padding: '8rem 4rem', minHeight: '80vh', textAlign: 'center', animation: 'fadeIn 0.5s ease-in' }}>
                <h1 style={{ fontSize: '3rem', marginBottom: '2rem', fontWeight: 400 }}>Shopping Cart</h1>
                <p style={{ color: '#666', fontSize: '1.25rem', marginBottom: '2rem' }}>You need to sign-in for accessing the cart.</p>
                <Link to="/login">
                    <button className="btn-primary" style={{ padding: '1rem 3rem' }}>Sign In</button>
                </Link>
            </div>
        );
    }

    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    return (
        <div style={{ padding: '4rem', display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '4rem', minHeight: '80vh', animation: 'fadeIn 0.5s ease-in' }}>
            {/* Left: Items */}
            <div>
                <h1 style={{ fontSize: '2rem', marginBottom: '3rem', borderBottom: '2px solid #000', paddingBottom: '1rem', fontWeight: 400 }}>Shopping Cart | {cart.reduce((total, item) => total + item.quantity, 0)} Items</h1>

                {cart.length === 0 ? (
                    <p style={{ fontSize: '1.25rem', color: '#666', marginTop: '2rem' }}>Your cart is empty. Please add items to checkout.</p>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        {cart.map((item, index) => {
                            const isWishlisted = wishlist.some(w => w._id === item._id);
                            
                            return (
                                <div key={index} style={{ display: 'flex', gap: '2rem', borderBottom: '1px solid #eaeaea', paddingBottom: '2rem' }}>
                                    <div style={{ backgroundImage: `url(${item.image})`, backgroundSize: 'cover', backgroundPosition: 'center', width: '180px', height: '240px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    </div>
                                    <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                            <div>
                                                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', fontWeight: 400 }}>{item.name}</h3>
                                                <p style={{ color: '#666', fontSize: '0.875rem', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>{item.category}</p>
                                                {(item.selectedSize || item.selectedColor) && (
                                                    <p style={{ color: '#888', fontSize: '0.85rem' }}>
                                                        {item.selectedSize && `Size: ${item.selectedSize}`} 
                                                        {item.selectedSize && item.selectedColor && ' | '}
                                                        {item.selectedColor && `Color: ${item.selectedColor}`}
                                                    </p>
                                                )}
                                            </div>
                                            <button onClick={() => toggleWishlist(item)} style={{ cursor: 'pointer', transition: 'transform 0.2s', border: 'none', background: 'none' }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}>
                                                {isWishlisted ? <FaHeart size={22} color="#000" /> : <FiHeart size={22} color="#000" />}
                                            </button>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                                            <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: '#111' }}>₹{(item.price * item.quantity).toLocaleString()}</p>
                                            
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ccc' }}>
                                                    <button onClick={() => updateQuantity(item.cartItemId || item._id, item.quantity - 1)} style={{ padding: '0.5rem 0.75rem', cursor: 'pointer', backgroundColor: '#f9f9f9', border: 'none' }}>-</button>
                                                    <span style={{ padding: '0 1rem', fontFamily: 'var(--font-serif)' }}>{item.quantity}</span>
                                                    <button onClick={() => updateQuantity(item.cartItemId || item._id, item.quantity + 1)} style={{ padding: '0.5rem 0.75rem', cursor: 'pointer', backgroundColor: '#f9f9f9', border: 'none' }}>+</button>
                                                </div>
                                                <button onClick={() => removeFromCart(item.cartItemId || item._id)} style={{ textDecoration: 'underline', fontSize: '0.875rem', color: '#555', cursor: 'pointer', border: 'none', background: 'none' }}>Remove</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Right: Summary */}
            <div>
                <div style={{ backgroundColor: '#f9f9f9', padding: '2.5rem', position: 'sticky', top: '2rem', border: '1px solid #eaeaea' }}>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '2.5rem', fontWeight: 400, letterSpacing: '0.05em' }}>Order Summary</h2>

                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                        <span style={{ color: '#555' }}>Subtotal</span>
                        <span>₹{subtotal.toLocaleString()}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                        <span style={{ color: '#555' }}>Shipping</span>
                        <span>{cart.length > 0 ? 'Calculated at checkout' : '-'}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', paddingBottom: '1.5rem', borderBottom: '1px solid #ddd' }}>
                        <span style={{ color: '#555' }}>Tax</span>
                        <span>₹0</span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3rem', fontSize: '1.5rem', fontWeight: 600 }}>
                        <span>Total</span>
                        <span style={{ fontFamily: 'var(--font-serif)' }}>₹{subtotal.toLocaleString()}</span>
                    </div>

                    <button className="btn-primary" disabled={cart.length === 0} style={{ width: '100%', padding: '1.5rem', marginBottom: '2.5rem', fontSize: '1.1rem', opacity: cart.length === 0 ? 0.5 : 1, cursor: cart.length === 0 ? 'not-allowed' : 'pointer' }}>
                        CHECKOUT
                    </button>

                    {/* Payment Icons */}
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                        <div style={{ width: '50px', height: '30px', backgroundColor: '#e0e0e0', borderRadius: '4px' }}></div>
                        <div style={{ width: '50px', height: '30px', backgroundColor: '#e0e0e0', borderRadius: '4px' }}></div>
                        <div style={{ width: '50px', height: '30px', backgroundColor: '#e0e0e0', borderRadius: '4px' }}></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
