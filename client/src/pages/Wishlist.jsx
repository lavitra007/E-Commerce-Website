import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { FaHeart } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const Wishlist = () => {
    const { wishlist, toggleWishlist } = useContext(ShopContext);
    const [userInfo, setUserInfo] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem('userInfo');
        if (storedUser) {
            setUserInfo(JSON.parse(storedUser));
        }
    }, []);

    if (!userInfo) {
        return (
            <div style={{ padding: '8rem 4rem', minHeight: '80vh', textAlign: 'center', animation: 'fadeIn 0.5s ease-in' }}>
                <h1 style={{ fontSize: '3rem', marginBottom: '2rem', fontWeight: 400 }}>Your Wishlist</h1>
                <p style={{ color: '#666', fontSize: '1.25rem', marginBottom: '2rem' }}>Please sign in to access your wishlist.</p>
                <Link to="/login">
                    <button className="btn-primary" style={{ padding: '1rem 3rem' }}>Sign In</button>
                </Link>
            </div>
        );
    }

    return (
        <div style={{ padding: '4rem', minHeight: '80vh', animation: 'fadeIn 0.5s ease-in' }}>
            <h1 style={{ fontSize: '3rem', marginBottom: '3rem', fontWeight: 400, textAlign: 'center' }}>Your Wishlist</h1>

            {wishlist.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '4rem 0' }}>
                    <p style={{ fontSize: '1.25rem', color: '#666', marginBottom: '2rem' }}>
                        Your wishlist is currently empty. Explore our collections to find your perfect luxury piece.
                    </p>
                    <Link to="/collection">
                        <button className="btn-primary" style={{ padding: '1rem 2rem' }}>Explore Collection</button>
                    </Link>
                </div>
            ) : (
                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
                    gap: '2.5rem' 
                }}>
                    {wishlist.map(item => (
                        <div key={item.id} style={{ display: 'flex', flexDirection: 'column' }}>
                            <div style={{ 
                                position: 'relative', 
                                backgroundImage: `url(${item.image})`, 
                                backgroundSize: 'cover', 
                                backgroundPosition: 'center', 
                                height: '400px', 
                                marginBottom: '1rem',
                                transition: 'transform 0.3s ease',
                                cursor: 'pointer'
                            }} 
                            onMouseOver={e => e.currentTarget.style.transform = 'translateY(-5px)'} 
                            onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}>
                                
                                <Link to={`/product/${item.id}`} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} />

                                <div 
                                    style={{ 
                                        position: 'absolute', 
                                        top: '1rem', 
                                        right: '1rem', 
                                        width: '36px', 
                                        height: '36px', 
                                        borderRadius: '50%', 
                                        backgroundColor: '#fff', 
                                        display: 'flex', 
                                        justifyContent: 'center', 
                                        alignItems: 'center', 
                                        cursor: 'pointer', 
                                        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                                        zIndex: 2,
                                        transition: 'transform 0.2s'
                                    }}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        toggleWishlist(item);
                                    }}
                                    onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1)'} 
                                    onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                                >
                                    <FaHeart size={18} color="#000" />
                                </div>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <div>
                                    <Link to={`/product/${item.id}`} style={{ fontSize: '1.1rem', fontWeight: 600, display: 'block', marginBottom: '0.25rem', color: '#000' }}>{item.name}</Link>
                                    <span style={{ color: '#666', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{item.category}</span>
                                </div>
                                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem' }}>₹{item.price.toLocaleString()}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Wishlist;
