import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
    const navigate = useNavigate();
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const [stats, setStats] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!userInfo || userInfo.role !== 'admin') {
            navigate('/');
            return;
        }

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

        fetchAdminData();
    }, [navigate, userInfo]);

    if (!userInfo || userInfo.role !== 'admin') return null;

    return (
        <div style={{ padding: '4rem', minHeight: '80vh', animation: 'fadeIn 0.5s ease-in' }}>
            <h1 style={{ fontSize: '3rem', marginBottom: '2rem', fontWeight: 400, textAlign: 'center' }}>Admin Dashboard</h1>
            
            {error && <div style={{ backgroundColor: '#ffebee', color: '#c62828', padding: '1rem', marginBottom: '2rem', textAlign: 'center' }}>{error}</div>}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', marginBottom: '4rem' }}>
                <div style={{ backgroundColor: '#f9f9f9', padding: '3rem', textAlign: 'center', border: '1px solid #eaeaea' }}>
                    <h3 style={{ fontSize: '1.25rem', color: '#666', marginBottom: '1rem' }}>Total Users</h3>
                    <p style={{ fontSize: '3rem', fontFamily: 'var(--font-serif)' }}>{stats ? stats.totalUsers : '-'}</p>
                </div>
                <div style={{ backgroundColor: '#f9f9f9', padding: '3rem', textAlign: 'center', border: '1px solid #eaeaea' }}>
                    <h3 style={{ fontSize: '1.25rem', color: '#666', marginBottom: '1rem' }}>Active Orders</h3>
                    <p style={{ fontSize: '3rem', fontFamily: 'var(--font-serif)' }}>{stats ? stats.activeOrders : '-'}</p>
                </div>
                <div style={{ backgroundColor: '#111', color: '#fff', padding: '3rem', textAlign: 'center' }}>
                    <h3 style={{ fontSize: '1.25rem', opacity: 0.8, marginBottom: '1rem' }}>Total Revenue</h3>
                    <p style={{ fontSize: '3rem', fontFamily: 'var(--font-serif)' }}>₹{stats ? stats.revenue.toLocaleString() : '-'}</p>
                </div>
            </div>

            <h2 style={{ fontSize: '2rem', marginBottom: '2rem', fontWeight: 400 }}>Recent Activity</h2>
            <div style={{ backgroundColor: '#f9f9f9', padding: '2rem', border: '1px solid #eaeaea' }}>
                <p style={{ color: '#666', fontStyle: 'italic' }}>System operating normally. No recent alerts.</p>
            </div>
        </div>
    );
};

export default Admin;
