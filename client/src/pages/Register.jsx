import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [adminSecret, setAdminSecret] = useState('');
    const [showAdminField, setShowAdminField] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, { name, email, password, adminSecret });
            localStorage.setItem('userInfo', JSON.stringify(response.data));
            navigate('/'); // Redirect to home page on success
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', padding: '2rem', animation: 'fadeIn 0.5s ease-in' }}>
            <div style={{ backgroundColor: 'var(--color-dusty-pink)', padding: '4rem', width: '100%', maxWidth: '500px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
                <h1 style={{ textAlign: 'center', marginBottom: '1.5rem', fontSize: '2rem', letterSpacing: '0.05em' }}>Create Account</h1>

                {error && <div style={{ backgroundColor: '#fff', borderLeft: '4px solid #cc0000', color: '#cc0000', padding: '1rem', marginBottom: '1.5rem', fontSize: '0.875rem' }}>{error}</div>}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <div>
                        <label style={{ fontSize: '0.875rem', color: '#222', marginBottom: '0.5rem', display: 'block', letterSpacing: '0.05em' }}>Full Name*</label>
                        <input type="text" required className="luxury-input" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div>
                        <label style={{ fontSize: '0.875rem', color: '#222', marginBottom: '0.5rem', display: 'block', letterSpacing: '0.05em' }}>Email*</label>
                        <input type="email" required className="luxury-input" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div>
                        <label style={{ fontSize: '0.875rem', color: '#222', marginBottom: '0.5rem', display: 'block', letterSpacing: '0.05em' }}>Password*</label>
                        <input type="password" required className="luxury-input" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    <div style={{ textAlign: 'right', marginTop: '-1rem' }}>
                        <button type="button" onClick={() => setShowAdminField(!showAdminField)} style={{ background: 'none', border: 'none', color: '#666', fontSize: '0.75rem', cursor: 'pointer', textDecoration: 'underline' }}>
                            {showAdminField ? 'Hide Admin Access' : 'Register as Admin'}
                        </button>
                    </div>
                    {showAdminField && (
                        <div style={{ animation: 'fadeIn 0.3s ease-in' }}>
                            <label style={{ fontSize: '0.875rem', color: '#222', marginBottom: '0.5rem', display: 'block', letterSpacing: '0.05em' }}>Admin Access Code</label>
                            <input type="password" className="luxury-input" placeholder="Enter admin code (optional)" value={adminSecret} onChange={(e) => setAdminSecret(e.target.value)} />
                        </div>
                    )}

                    <button type="submit" disabled={loading} className="btn-primary" style={{ marginTop: '1rem', width: '100%', opacity: loading ? 0.7 : 1 }}>
                        {loading ? 'CREATING...' : 'CREATE ACCOUNT'}
                    </button>
                </form>

                <div style={{ textAlign: 'center', marginTop: '3rem', fontSize: '0.875rem' }}>
                    <p>Already have an account? <Link to="/login" style={{ fontWeight: 600, textDecoration: 'underline', color: 'var(--color-pitch-black)' }}>Log in</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Register;
