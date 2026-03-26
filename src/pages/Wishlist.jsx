import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Wishlist = () => {
    const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem('userInfo')));

    useEffect(() => {
        const verifyUser = async () => {
            if (userInfo && userInfo.token) {
                try {
                    await axios.get('http://localhost:5000/api/auth/me', {
                        headers: { Authorization: `Bearer ${userInfo.token}` }
                    });
                } catch (error) {
                    // Token is invalid or user was deleted from DB
                    localStorage.removeItem('userInfo');
                    setUserInfo(null);
                }
            } else if (!userInfo) {
                setUserInfo(null);
            }
        };
        verifyUser();
    }, [userInfo]);

    return (
        <div style={{ padding: '4rem', minHeight: '70vh', animation: 'fadeIn 0.5s ease-in' }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h1 style={{ fontSize: '3rem', marginBottom: '1rem', fontWeight: 400 }}>Wishlist</h1>
                {!userInfo && (
                    <p style={{ color: '#666', fontSize: '1.1rem', letterSpacing: '0.05em' }}>To access your wishlist sign in now!</p>
                )}
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '2rem'
            }}>
                {/* Product Placeholders */}
                {[1, 2, 3].map(item => (
                    <div key={item} style={{ position: 'relative', backgroundColor: 'var(--color-dusty-pink)', height: '450px', display: 'flex', justifyContent: 'center', alignItems: 'center', transition: 'transform 0.3s ease' }} onMouseOver={e => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}>
                        <span style={{ color: 'var(--color-pitch-black)', opacity: 0.5, letterSpacing: '0.1em' }}>PRODUCT {item}</span>
                        <div style={{ position: 'absolute', top: '1rem', right: '1rem', width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
                            <span style={{ fontSize: '1rem', color: '#000' }}>♡</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Wishlist;
