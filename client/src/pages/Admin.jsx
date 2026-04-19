import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
    const navigate = useNavigate();
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const [stats, setStats] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    // Form states
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [stock, setStock] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);

    const fetchAdminData = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/stats`, {
                headers: { Authorization: `Bearer ${userInfo.token}` }
            });
            setStats(data);
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

    if (!userInfo || userInfo.role !== 'admin') return null;

    return (
        <div style={{ padding: '4rem', minHeight: '80vh', backgroundColor: '#fff', color: '#111', animation: 'fadeIn 0.8s ease-out' }}>
            <h1 style={{ fontSize: '3.5rem', marginBottom: '3rem', fontWeight: 300, textAlign: 'center', letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: 'var(--font-serif)' }}>Management</h1>
            
            {error && <div style={{ backgroundColor: '#fff', borderLeft: '4px solid #cc0000', color: '#cc0000', padding: '1.5rem', marginBottom: '2rem', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>{error}</div>}
            {success && <div style={{ backgroundColor: '#f0f9f0', borderLeft: '4px solid #4caf50', color: '#2e7d32', padding: '1.5rem', marginBottom: '2rem', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>Product added successfully to Cloudinary & Database.</div>}

            {/* Stats Section */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '5rem' }}>
                {[
                    { label: 'Total Users', value: stats?.totalUsers },
                    { label: 'Total Products', value: stats?.totalProducts },
                    { label: 'Active Orders', value: stats?.activeOrders },
                    { label: 'Revenue', value: `₹${stats?.revenue.toLocaleString()}`, highlight: true }
                ].map((item, idx) => (
                    <div key={idx} style={{ 
                        backgroundColor: item.highlight ? '#111' : '#fcfcfc', 
                        color: item.highlight ? '#fff' : '#111',
                        padding: '2.5rem', 
                        textAlign: 'center', 
                        border: '1px solid #eee',
                        boxShadow: item.highlight ? '0 10px 30px rgba(0,0,0,0.2)' : 'none'
                    }}>
                        <h3 style={{ fontSize: '0.8rem', opacity: 0.6, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 500 }}>{item.label}</h3>
                        <p style={{ fontSize: '2.5rem', fontFamily: 'var(--font-serif)', margin: 0 }}>{stats ? item.value : '-'}</p>
                    </div>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '5rem' }}>
                {/* Add Product Form */}
                <div style={{ backgroundColor: '#fff', padding: '4rem', border: '1px solid #eee', boxShadow: '0 20px 50px rgba(0,0,0,0.03)' }}>
                    <h2 style={{ fontSize: '1.75rem', marginBottom: '3rem', fontWeight: 300, textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: 'center' }}>Add to Inventory</h2>
                    <form onSubmit={handleProductSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                        <div>
                            <label style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: '#999', marginBottom: '0.5rem', display: 'block', letterSpacing: '0.05em' }}>Product Name</label>
                            <input required type="text" value={name} onChange={(e) => setName(e.target.value)} className="luxury-input" placeholder="e.g. Diamond Signature Ring" />
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
                            <div>
                                <label style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: '#999', marginBottom: '0.5rem', display: 'block', letterSpacing: '0.05em' }}>Price (INR)</label>
                                <input required type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="luxury-input" placeholder="0.00" />
                            </div>
                            <div>
                                <label style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: '#999', marginBottom: '0.5rem', display: 'block', letterSpacing: '0.05em' }}>Stock Level</label>
                                <input required type="number" value={stock} onChange={(e) => setStock(e.target.value)} className="luxury-input" placeholder="0" />
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
                        <button type="submit" disabled={uploading} className="btn-primary" style={{ marginTop: '1rem', width: '100%' }}>
                            {uploading ? 'UPLOADING TO CLOUD...' : 'SAVE PRODUCT'}
                        </button>
                    </form>
                </div>

                {/* System Monitoring */}
                <div>
                    <h2 style={{ fontSize: '1.75rem', marginBottom: '3rem', fontWeight: 300, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Infrastructure</h2>
                    <div style={{ border: '1px solid #eee', padding: '4rem', backgroundColor: '#fcfcfc' }}>
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
                </div>
            </div>
        </div>
    );
};

export default Admin;
