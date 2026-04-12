import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Account = () => {
    const navigate = useNavigate();
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

    useEffect(() => {
        if (!userInfo) {
            navigate('/login');
        }
    }, [navigate, userInfo]);

    const handleLogout = () => {
        localStorage.removeItem('userInfo');
        navigate('/');
    };

    if (!userInfo) return null;

    return (
        <div style={{ padding: '4rem', minHeight: '80vh', animation: 'fadeIn 0.5s ease-in', position: 'relative' }}>
            {showLogoutConfirm && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 100 }}>
                    <div style={{ backgroundColor: '#fff', padding: '3rem', maxWidth: '400px', width: '90%', textAlign: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontWeight: 400 }}>Sign Out</h2>
                        <p style={{ color: '#666', marginBottom: '2rem', lineHeight: 1.6 }}>Are you sure you want to securely log out of your account?</p>
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                            <button onClick={() => setShowLogoutConfirm(false)} style={{ padding: '0.75rem 1.5rem', border: '1px solid #ccc', backgroundColor: '#fff', cursor: 'pointer', transition: 'background-color 0.2s', fontWeight: 600 }} onMouseOver={e => e.currentTarget.style.backgroundColor = '#f9f9f9'} onMouseOut={e => e.currentTarget.style.backgroundColor = '#fff'}>Cancel</button>
                            <button onClick={handleLogout} style={{ padding: '0.75rem 1.5rem', border: '1px solid #000', backgroundColor: '#000', color: '#fff', cursor: 'pointer', transition: 'background-color 0.2s', fontWeight: 600 }} onMouseOver={e => e.currentTarget.style.backgroundColor = '#333'} onMouseOut={e => e.currentTarget.style.backgroundColor = '#000'}>Yes, Log Out</button>
                        </div>
                    </div>
                </div>
            )}
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h1 style={{ fontSize: '3rem', marginBottom: '1rem', fontWeight: 400 }}>My Account</h1>
                <p style={{ color: '#666', fontSize: '1.25rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                    Welcome, {userInfo.name || 'Valued Client'}
                </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '4rem' }}>
                {/* Sidebar */}
                <div style={{ borderRight: '1px solid #eaeaea', paddingRight: '2rem' }}>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        <li style={{ marginBottom: '1.5rem', fontWeight: 600, fontSize: '1.1rem', cursor: 'pointer' }}>Order History</li>
                        <li style={{ marginBottom: '1.5rem', color: '#666', cursor: 'pointer', transition: 'color 0.2s', ':hover': { color: '#000'} }}>Profile Details</li>
                        <li style={{ marginBottom: '1.5rem', color: '#666', cursor: 'pointer' }}>Addresses</li>
                        <li style={{ marginBottom: '1.5rem', color: '#666', cursor: 'pointer' }}>Payment Methods</li>
                        <li style={{ marginTop: '3rem' }}>
                            <button onClick={() => setShowLogoutConfirm(true)} style={{ textDecoration: 'underline', color: '#000', fontSize: '1rem', cursor: 'pointer', opacity: 0.8, transition: 'opacity 0.2s' }} onMouseOver={e => e.currentTarget.style.opacity = 1} onMouseOut={e => e.currentTarget.style.opacity = 0.8}>
                                Sign Out
                            </button>
                        </li>
                    </ul>
                </div>

                {/* Main Content */}
                <div>
                    <h2 style={{ fontSize: '1.75rem', marginBottom: '2rem', fontWeight: 400, borderBottom: '1px solid #000', paddingBottom: '1rem' }}>Order Summary</h2>
                    
                    <div style={{ backgroundColor: '#f9f9f9', padding: '2.5rem', marginBottom: '3rem', border: '1px solid #eaeaea' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', borderBottom: '1px solid #ddd', paddingBottom: '1.5rem' }}>
                            <span style={{ fontWeight: 600, fontSize: '1.1rem' }}>Order #FL-2026-8924</span>
                            <span style={{ color: '#222', backgroundColor: '#e9eaec', padding: '0.25rem 1rem', borderRadius: '4px', fontSize: '0.875rem' }}>Delivered</span>
                        </div>
                        <p style={{ color: '#666', marginBottom: '2rem', fontSize: '0.875rem', letterSpacing: '0.05em' }}>Placed on March 15, 2026</p>
                        
                        <div style={{ display: 'flex', gap: '2rem' }}>
                            <div style={{ width: '100px', height: '130px', backgroundImage: 'url("https://images.unsplash.com/photo-1599643478514-4a4e0c4cd541?q=80&w=200&auto=format&fit=crop")', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: 400, marginBottom: '0.5rem' }}>Signature Piece</h3>
                                <p style={{ fontSize: '0.875rem', color: '#666' }}>Quantity: 1</p>
                                <p style={{ fontFamily: 'var(--font-serif)', marginTop: '0.5rem', fontSize: '1.1rem' }}>₹1,25,000</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Account;
