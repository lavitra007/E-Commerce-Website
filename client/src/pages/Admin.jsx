import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
    const navigate = useNavigate();
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const [stats, setStats] = useState(null);
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' | 'users'

    // Form states
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [stock, setStock] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);

    // Stats Form states
    const [updateOrders, setUpdateOrders] = useState('');
    const [updateRevenue, setUpdateRevenue] = useState('');
    const [updatingStats, setUpdatingStats] = useState(false);
    const fetchAdminData = async () => {
        try {
            const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
            const [{ data: statsData }, { data: usersData }] = await Promise.all([
                axios.get(`${import.meta.env.VITE_API_URL}/api/admin/stats`, config),
                axios.get(`${import.meta.env.VITE_API_URL}/api/admin/users`, config)
            ]);
            setStats(statsData);
            setUsers(usersData);
        } catch (err) {
            setError(err.response?.data?.message || 'Unauthorized');
        }
    };

    useEffect(() => {
        if (!userInfo || userInfo.role !== 'admin') {
            navigate('/');
            return;
        }
        fetchAdminData();
    }, [navigate, userInfo]);

    const handleProductSubmit = async (e) => {
        e.preventDefault();
        setUploading(true);
        setSuccess(false);
        setError(null);

        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('category', category);
        formData.append('stock', stock);
        formData.append('description', description);
        formData.append('image', image);

        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/products`, formData, {
                headers: { 
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${userInfo.token}` 
                }
            });
            setSuccess(true);
            setName('');
            setPrice('');
            setCategory('');
            setStock('');
            setDescription('');
            setImage(null);
            fetchAdminData();
        } catch (err) {
            setError(err.response?.data?.message || 'Upload failed');
        } finally {
            setUploading(false);
        }
    };

    const handleStatsUpdate = async (e) => {
        e.preventDefault();
        setUpdatingStats(true);
        setError(null);
        setSuccess(false);
        try {
            const payload = {};
            if (updateOrders) payload.activeOrders = updateOrders;
            if (updateRevenue) payload.revenue = updateRevenue;

            await axios.put(`${import.meta.env.VITE_API_URL}/api/admin/stats`, payload, {
                headers: { Authorization: `Bearer ${userInfo.token}` }
            });
            setSuccess(true);
            setUpdateOrders('');
            setUpdateRevenue('');
            fetchAdminData();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update stats');
        } finally {
            setUpdatingStats(false);
        }
    };

    const handleDeleteUser = async (id) => {
        if (!window.confirm('Are you sure you want to remove this user from the system?')) return;
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/api/admin/users/${id}`, {
                headers: { Authorization: `Bearer ${userInfo.token}` }
            });
            fetchAdminData();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to delete user');
        }
    };

    if (!userInfo || userInfo.role !== 'admin') return null;

    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#fafafa' }}>
            {/* Sidebar */}
            <div style={{ width: '280px', backgroundColor: '#0a0a0a', color: '#fff', padding: '3rem 2rem', position: 'fixed', height: '100vh', overflowY: 'auto' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 300, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '4rem', fontFamily: 'var(--font-serif)' }}>Luxe Control</h2>
                
                <nav style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <button 
                        onClick={() => setActiveTab('dashboard')}
                        style={{ background: 'none', border: 'none', color: activeTab === 'dashboard' ? '#fff' : '#666', textAlign: 'left', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em', padding: '1rem 0', borderBottom: '1px solid #222', cursor: 'pointer', transition: 'color 0.3s' }}>
                        Platform Setup
                    </button>
                    <button 
                        onClick={() => setActiveTab('users')}
                        style={{ background: 'none', border: 'none', color: activeTab === 'users' ? '#fff' : '#666', textAlign: 'left', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em', padding: '1rem 0', borderBottom: '1px solid #222', cursor: 'pointer', transition: 'color 0.3s' }}>
                        User Directory
                    </button>
                    <button 
                        onClick={() => {
                            localStorage.removeItem('userInfo');
                            navigate('/login');
                        }}
                        style={{ background: 'none', border: 'none', color: '#666', textAlign: 'left', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em', padding: '1rem 0', cursor: 'pointer', marginTop: '2rem' }}>
                        Logout Admin
                    </button>
                </nav>
            </div>

            {/* Main Content */}
            <div style={{ flex: 1, marginLeft: '280px', padding: '4rem', color: '#111', animation: 'fadeIn 0.8s ease-out' }}>
                <h1 style={{ fontSize: '3.5rem', marginBottom: '3rem', fontWeight: 300, letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'var(--font-serif)' }}>
                    {activeTab === 'dashboard' ? 'Overview' : 'User Directory'}
                </h1>
                
                {error && <div style={{ backgroundColor: '#fff', borderLeft: '4px solid #cc0000', color: '#cc0000', padding: '1.5rem', marginBottom: '2rem', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>{error}</div>}
                
                {activeTab === 'dashboard' && (
                    <>
                        {success && <div style={{ backgroundColor: '#f0f9f0', borderLeft: '4px solid #4caf50', color: '#2e7d32', padding: '1.5rem', marginBottom: '2rem', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>Product added successfully to Cloudinary & Database.</div>}

                        {/* Stats Section */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '5rem' }}>
                            {[
                                { label: 'Total Users', value: stats?.totalUsers },
                                { label: 'Total Products', value: stats?.totalProducts },
                                { label: 'Active Orders', value: stats?.activeOrders },
                                { label: 'Revenue', value: `₹${stats?.revenue?.toLocaleString()}`, highlight: true }
                            ].map((item, idx) => (
                                <div key={idx} style={{ 
                                    backgroundColor: item.highlight ? '#111' : '#fff', 
                                    color: item.highlight ? '#fff' : '#111',
                                    padding: '2.5rem', 
                                    textAlign: 'center', 
                                    border: '1px solid #ebebeb',
                                    boxShadow: item.highlight ? '0 10px 30px rgba(0,0,0,0.2)' : 'none'
                                }}>
                                    <h3 style={{ fontSize: '0.8rem', opacity: 0.6, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 500 }}>{item.label}</h3>
                                    <p style={{ fontSize: '2.5rem', fontFamily: 'var(--font-serif)', margin: 0 }}>{stats ? item.value : '-'}</p>
                                </div>
                            ))}
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '5rem' }}>
                            {/* Add Product Form */}
                            <div style={{ backgroundColor: '#fff', padding: '4rem', border: '1px solid #ebebeb', boxShadow: '0 20px 50px rgba(0,0,0,0.02)' }}>
                                <h2 style={{ fontSize: '1.75rem', marginBottom: '3rem', fontWeight: 300, textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: 'center' }}>Add to Inventory</h2>
                                <form onSubmit={handleProductSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                                    <div>
                                        <label style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: '#999', marginBottom: '0.5rem', display: 'block', letterSpacing: '0.05em' }}>Product Name</label>
                                        <input required type="text" value={name} onChange={(e) => setName(e.target.value)} className="luxury-input" placeholder="e.g. Diamond Signature Ring" style={{ width: '100%', border: 'none', borderBottom: '1px solid #ccc', padding: '0.5rem 0', outline: 'none' }} />
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
                                        <div>
                                            <label style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: '#999', marginBottom: '0.5rem', display: 'block', letterSpacing: '0.05em' }}>Price (INR)</label>
                                            <input required type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="luxury-input" placeholder="0.00" style={{ width: '100%', border: 'none', borderBottom: '1px solid #ccc', padding: '0.5rem 0', outline: 'none' }} />
                                        </div>
                                        <div>
                                            <label style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: '#999', marginBottom: '0.5rem', display: 'block', letterSpacing: '0.05em' }}>Stock Level</label>
                                            <input required type="number" value={stock} onChange={(e) => setStock(e.target.value)} className="luxury-input" placeholder="0" style={{ width: '100%', border: 'none', borderBottom: '1px solid #ccc', padding: '0.5rem 0', outline: 'none' }}/>
                                        </div>
                                    </div>
                                    <div>
                                        <label style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: '#999', marginBottom: '0.5rem', display: 'block', letterSpacing: '0.05em' }}>Category</label>
                                        <select required value={category} onChange={(e) => setCategory(e.target.value)} style={{ width: '100%', border: 'none', borderBottom: '1px solid #ccc', padding: '1rem 0', background: 'transparent', outline: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>
                                            <option value="">Select Category</option>
                                            <option value="Fine Jewelry">Fine Jewelry</option>
                                            <option value="Earrings">Earrings</option>
                                            <option value="Wedding">Wedding</option>
                                            <option value="Daily Wear">Daily Wear</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: '#999', marginBottom: '0.5rem', display: 'block', letterSpacing: '0.05em' }}>Description</label>
                                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter product details..." style={{ width: '100%', border: 'none', borderBottom: '1px solid #ccc', padding: '1rem 0', background: 'transparent', outline: 'none', minHeight: '80px', fontFamily: 'inherit', resize: 'vertical' }} />
                                    </div>
                                    <div>
                                        <label style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: '#999', marginBottom: '1rem', display: 'block', letterSpacing: '0.05em' }}>Product Imagery</label>
                                        <div style={{ border: '1px dashed #ccc', padding: '2rem', textAlign: 'center', backgroundColor: '#fafafa' }}>
                                            <input required type="file" onChange={(e) => setImage(e.target.files[0])} style={{ cursor: 'pointer' }} />
                                            <p style={{ fontSize: '0.7rem', color: '#999', marginTop: '1rem' }}>Secure Cloudinary Upload (Max 5MB)</p>
                                        </div>
                                    </div>
                                    <button type="submit" disabled={uploading} className="btn-primary" style={{ marginTop: '1rem', width: '100%', padding: '1.2rem', backgroundColor: '#111', color: '#fff', border: 'none', textTransform: 'uppercase', cursor: 'pointer', letterSpacing: '0.1em' }}>
                                        {uploading ? 'UPLOADING TO CLOUD...' : 'SAVE PRODUCT'}
                                    </button>
                                </form>
                            </div>

                            {/* System Monitoring */}
                            <div>
                                <h2 style={{ fontSize: '1.75rem', marginBottom: '3rem', fontWeight: 300, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Infrastructure</h2>
                                <div style={{ border: '1px solid #ebebeb', padding: '4rem', backgroundColor: '#fff' }}>
                                    <div style={{ marginBottom: '3rem' }}>
                                        <h4 style={{ fontSize: '0.9rem', marginBottom: '1rem', fontWeight: 600 }}>Database Status</h4>
                                        <p style={{ color: '#666', fontSize: '0.9rem', lineHeight: 1.8 }}>Connected to MongoDB Atlas Cluster. Real-time synchronization active for inventory and user records.</p>
                                    </div>
                                    <div style={{ marginBottom: '3rem' }}>
                                        <h4 style={{ fontSize: '0.9rem', marginBottom: '1rem', fontWeight: 600 }}>Media Delivery</h4>
                                        <p style={{ color: '#666', fontSize: '0.9rem', lineHeight: 1.8 }}>Cloudinary CDN enabled. Images are automatically optimized for delivery across all global regions.</p>
                                    </div>
                                    <div style={{ marginTop: '4rem' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                            <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>Storage Efficiency</span>
                                            <span style={{ fontSize: '0.7rem', fontWeight: 600 }}>98.2%</span>
                                        </div>
                                        <div style={{ width: '100%', height: '1px', backgroundColor: '#eee' }}>
                                            <div style={{ width: '98%', height: '100%', backgroundColor: '#111' }}></div>
                                        </div>
                                    </div>
                                </div>
                                
                                <h2 style={{ fontSize: '1.75rem', marginBottom: '3rem', marginTop: '5rem', fontWeight: 300, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Analytics Adjustment</h2>
                                <div style={{ border: '1px solid #ebebeb', padding: '4rem', backgroundColor: '#fff' }}>
                                    <form onSubmit={handleStatsUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                        <div>
                                            <label style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: '#999', marginBottom: '0.5rem', display: 'block', letterSpacing: '0.05em' }}>Override Active Orders</label>
                                            <input type="number" value={updateOrders} onChange={(e) => setUpdateOrders(e.target.value)} className="luxury-input" placeholder="Enter new count" style={{ width: '100%', border: 'none', borderBottom: '1px solid #ccc', padding: '0.5rem 0', outline: 'none' }} />
                                        </div>
                                        <div>
                                            <label style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: '#999', marginBottom: '0.5rem', display: 'block', letterSpacing: '0.05em' }}>Override Revenue (INR)</label>
                                            <input type="number" value={updateRevenue} onChange={(e) => setUpdateRevenue(e.target.value)} className="luxury-input" placeholder="Enter new revenue" style={{ width: '100%', border: 'none', borderBottom: '1px solid #ccc', padding: '0.5rem 0', outline: 'none' }} />
                                        </div>
                                        <button type="submit" disabled={updatingStats} className="btn-primary" style={{ marginTop: '1rem', width: '100%', padding: '1rem', backgroundColor: '#111', color: '#fff', border: 'none', textTransform: 'uppercase', cursor: 'pointer', letterSpacing: '0.1em' }}>
                                            {updatingStats ? 'UPDATING...' : 'SYNC OVERRIDES'}
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {activeTab === 'users' && (
                    <div style={{ backgroundColor: '#fff', padding: '3rem', border: '1px solid #ebebeb', boxShadow: '0 10px 30px rgba(0,0,0,0.02)' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                            <thead>
                                <tr style={{ borderBottom: '2px solid #111', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.8rem' }}>
                                    <th style={{ padding: '1rem', fontWeight: 600 }}>Name</th>
                                    <th style={{ padding: '1rem', fontWeight: 600 }}>Email</th>
                                    <th style={{ padding: '1rem', fontWeight: 600 }}>Role</th>
                                    <th style={{ padding: '1rem', fontWeight: 600, textAlign: 'right' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(user => (
                                    <tr key={user._id} style={{ borderBottom: '1px solid #eee' }}>
                                        <td style={{ padding: '1rem' }}>{user.name}</td>
                                        <td style={{ padding: '1rem', color: '#666' }}>{user.email}</td>
                                        <td style={{ padding: '1rem' }}>
                                            <span style={{ 
                                                backgroundColor: user.role === 'admin' ? '#111' : '#f0f0f0', 
                                                color: user.role === 'admin' ? '#fff' : '#111', 
                                                padding: '0.3rem 0.8rem', 
                                                borderRadius: '20px', 
                                                fontSize: '0.7rem', 
                                                textTransform: 'uppercase', 
                                                letterSpacing: '0.05em' 
                                            }}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td style={{ padding: '1rem', textAlign: 'right' }}>
                                            <button 
                                                onClick={() => handleDeleteUser(user._id)}
                                                disabled={user._id === userInfo._id}
                                                style={{ 
                                                    background: 'none', 
                                                    border: 'none', 
                                                    color: user._id === userInfo._id ? '#ccc' : '#cc0000', 
                                                    cursor: user._id === userInfo._id ? 'not-allowed' : 'pointer', 
                                                    fontSize: '0.8rem',
                                                    textDecoration: 'underline'
                                                }}>
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {users.length === 0 && <p style={{ textAlign: 'center', padding: '3rem', color: '#666' }}>No users found.</p>}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Admin;
