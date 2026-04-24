import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../config';

const Account = () => {
    console.log("Using API Base URL:", BASE_URL);
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem('userInfo')));
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
    const [activeTab, setActiveTab] = useState('orders'); // orders, profile, addresses
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    // Profile Details
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    
    // Addresses
    const [addresses, setAddresses] = useState([]);
    const [newAddressText, setNewAddressText] = useState('');
    const [newAddressLabel, setNewAddressLabel] = useState('Home');

    useEffect(() => {
        if (!userInfo) {
            navigate('/login');
        } else {
            fetchProfile();
        }
    }, [navigate, userInfo]);

    const fetchProfile = async () => {
        try {
            const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
            const { data } = await axios.get(`${BASE_URL}/api/auth/me`, config);
            setName(data.name || '');
            setPhone(data.phone || '');
            setAddresses(data.addresses || []);
        } catch (error) {
            console.error(error);
        }
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
            const payload = { name, phone };
            const { data } = await axios.put(`${BASE_URL}/api/auth/profile`, payload, config);
            localStorage.setItem('userInfo', JSON.stringify(data));
            setUserInfo(data);
            setMessage('Profile updated successfully');
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            console.error(error);
            setMessage('Failed to update profile: ' + (error.response?.data?.message || error.message));
            setTimeout(() => setMessage(''), 5000);
        } finally {
            setLoading(false);
        }
    };

    const handleAddAddress = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
            const updatedAddresses = [...addresses, { label: newAddressLabel, text: newAddressText }];
            const { data } = await axios.put(`${BASE_URL}/api/auth/profile`, { addresses: updatedAddresses }, config);
            setAddresses(data.addresses);
            setNewAddressText('');
            setMessage('Address added successfully');
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            console.error(error);
            setMessage('Failed to add address: ' + (error.response?.data?.message || error.message));
            setTimeout(() => setMessage(''), 5000);
        } finally {
            setLoading(false);
        }
    };

    const handleRemoveAddress = async (indexToRemove) => {
        setLoading(true);
        try {
            const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
            const updatedAddresses = addresses.filter((_, idx) => idx !== indexToRemove);
            const { data } = await axios.put(`${BASE_URL}/api/auth/profile`, { addresses: updatedAddresses }, config);
            setAddresses(data.addresses);
            setMessage('Address removed successfully');
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            console.error(error);
            setMessage('Failed to remove address: ' + (error.response?.data?.message || error.message));
            setTimeout(() => setMessage(''), 5000);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('userInfo');
        navigate('/');
    };

    if (!userInfo) return null;

    return (
        <div style={{ padding: '4rem', minHeight: '80vh', animation: 'fadeIn 0.5s ease-in', position: 'relative' }}>
            {showLogoutConfirm && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2000 }}>
                    <div style={{ backgroundColor: '#fff', padding: '3rem', maxWidth: '400px', width: '90%', textAlign: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontWeight: 400 }}>Sign Out</h2>
                        <p style={{ color: '#666', marginBottom: '2rem', lineHeight: 1.6 }}>Are you sure you want to securely log out of your account?</p>
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                            <button onClick={() => setShowLogoutConfirm(false)} style={{ padding: '0.75rem 1.5rem', border: '1px solid #ccc', backgroundColor: '#fff', cursor: 'pointer', transition: 'background-color 0.2s', fontWeight: 600 }}>Cancel</button>
                            <button onClick={handleLogout} style={{ padding: '0.75rem 1.5rem', border: '1px solid #000', backgroundColor: '#000', color: '#fff', cursor: 'pointer', transition: 'background-color 0.2s', fontWeight: 600 }}>Yes, Log Out</button>
                        </div>
                    </div>
                </div>
            )}
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h1 style={{ fontSize: '3rem', marginBottom: '1rem', fontWeight: 400 }}>My Account</h1>
                <p style={{ color: '#666', fontSize: '1.25rem', letterSpacing: '0.05em' }}>
                    Welcome, {userInfo.name || 'Valued Client'}
                </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '4rem' }}>
                {/* Sidebar */}
                <div style={{ borderRight: '1px solid #eaeaea', paddingRight: '2rem' }}>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        <li onClick={() => setActiveTab('orders')} style={{ marginBottom: '1.5rem', fontWeight: activeTab === 'orders' ? 600 : 400, color: activeTab === 'orders' ? '#000' : '#666', fontSize: '1.1rem', cursor: 'pointer' }}>Order History</li>
                        <li onClick={() => setActiveTab('profile')} style={{ marginBottom: '1.5rem', fontWeight: activeTab === 'profile' ? 600 : 400, color: activeTab === 'profile' ? '#000' : '#666', fontSize: '1.1rem', cursor: 'pointer' }}>Profile Details</li>
                        <li onClick={() => setActiveTab('addresses')} style={{ marginBottom: '1.5rem', fontWeight: activeTab === 'addresses' ? 600 : 400, color: activeTab === 'addresses' ? '#000' : '#666', fontSize: '1.1rem', cursor: 'pointer' }}>Addresses</li>

                        <li style={{ marginTop: '3rem' }}>
                            <button onClick={() => setShowLogoutConfirm(true)} style={{ background: 'none', border: 'none', textDecoration: 'underline', color: '#000', fontSize: '1rem', cursor: 'pointer', opacity: 0.8 }}>
                                Sign Out
                            </button>
                        </li>
                    </ul>
                </div>

                {/* Main Content */}
                <div>
                    {message && <div style={{ backgroundColor: '#000', color: '#fff', padding: '1rem', marginBottom: '2rem', textAlign: 'center' }}>{message}</div>}

                    {activeTab === 'orders' && (
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
                    )}

                    {activeTab === 'profile' && (
                        <div>
                            <h2 style={{ fontSize: '1.75rem', marginBottom: '2rem', fontWeight: 400, borderBottom: '1px solid #000', paddingBottom: '1rem' }}>Profile Details</h2>
                            <form onSubmit={handleUpdateProfile} style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '400px' }}>
                                <div>
                                    <label style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: '#999', marginBottom: '0.5rem', display: 'block' }}>Full Name</label>
                                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required style={{ width: '100%', border: 'none', borderBottom: '1px solid #ccc', padding: '0.5rem 0', outline: 'none' }} />
                                </div>
                                <div>
                                    <label style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: '#999', marginBottom: '0.5rem', display: 'block' }}>Phone Number</label>
                                    <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} style={{ width: '100%', border: 'none', borderBottom: '1px solid #ccc', padding: '0.5rem 0', outline: 'none' }} />
                                </div>
                                <div>
                                    <label style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: '#999', marginBottom: '0.5rem', display: 'block' }}>Email Address (Cannot be changed)</label>
                                    <input type="email" value={userInfo.email} disabled style={{ width: '100%', border: 'none', borderBottom: '1px solid #ccc', padding: '0.5rem 0', outline: 'none', color: '#999' }} />
                                </div>
                                <button type="submit" disabled={loading} style={{ padding: '1rem', backgroundColor: '#000', color: '#fff', border: 'none', textTransform: 'uppercase', cursor: 'pointer', marginTop: '1rem' }}>
                                    {loading ? 'Saving...' : 'Save Details'}
                                </button>
                            </form>
                        </div>
                    )}

                    {activeTab === 'addresses' && (
                        <div>
                            <h2 style={{ fontSize: '1.75rem', marginBottom: '2rem', fontWeight: 400, borderBottom: '1px solid #000', paddingBottom: '1rem' }}>Addresses</h2>
                            <div style={{ display: 'grid', gap: '1.5rem', marginBottom: '3rem' }}>
                                {addresses.map((address, idx) => (
                                    <div key={idx} style={{ backgroundColor: '#f9f9f9', padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #eaeaea' }}>
                                        <div>
                                            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', backgroundColor: '#ddd', padding: '0.2rem 0.5rem', borderRadius: '2px', fontWeight: 600 }}>{address.label}</span>
                                            <p style={{ marginTop: '0.5rem', color: '#333' }}>{address.text}</p>
                                        </div>
                                        <button onClick={() => handleRemoveAddress(idx)} style={{ background: 'none', border: 'none', textDecoration: 'underline', color: '#cc0000', cursor: 'pointer' }}>Remove</button>
                                    </div>
                                ))}
                            </div>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', fontWeight: 400 }}>Add New Address</h3>
                            <form onSubmit={handleAddAddress} style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '500px' }}>
                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    {['Home', 'Work', 'Personal'].map(label => (
                                        <label key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                                            <input type="radio" name="address_label" checked={newAddressLabel === label} onChange={() => setNewAddressLabel(label)} />
                                            {label}
                                        </label>
                                    ))}
                                </div>
                                <div>
                                    <textarea value={newAddressText} onChange={(e) => setNewAddressText(e.target.value)} required placeholder="123 Luxury Avenue, Suite 100..." style={{ width: '100%', border: '1px solid #ccc', padding: '1rem', minHeight: '100px', outline: 'none', fontFamily: 'inherit' }}></textarea>
                                </div>
                                <button type="submit" disabled={loading} style={{ padding: '1rem', backgroundColor: '#000', color: '#fff', border: 'none', textTransform: 'uppercase', cursor: 'pointer' }}>
                                    {loading ? 'Adding...' : 'Add Address'}
                                </button>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Account;
