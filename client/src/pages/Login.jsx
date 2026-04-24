import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { BASE_URL } from '../config';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post(`${BASE_URL}/api/auth/login`, { email, password });
            // Save JWT token and user info
            localStorage.setItem('userInfo', JSON.stringify(response.data));
            
            if (response.data.role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/'); // Redirect to home page on success
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', padding: '2rem', animation: 'fadeIn 0.5s ease-in' }}>
            <div style={{ backgroundColor: 'var(--color-dusty-pink)', padding: '4rem', width: '100%', maxWidth: '500px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
                <h1 style={{ textAlign: 'center', marginBottom: '1.5rem', fontSize: '2rem', letterSpacing: '0.05em' }}>Log in</h1>

                {error && <div style={{ backgroundColor: '#fff', borderLeft: '4px solid #cc0000', color: '#cc0000', padding: '1rem', marginBottom: '1.5rem', fontSize: '0.875rem' }}>{error}</div>}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <div>
                        <label style={{ fontSize: '0.875rem', color: '#222', marginBottom: '0.5rem', display: 'block', letterSpacing: '0.05em' }}>Email*</label>
                        <input
                            type="email"
                            required
                            className="luxury-input"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label style={{ fontSize: '0.875rem', color: '#222', marginBottom: '0.5rem', display: 'block', letterSpacing: '0.05em' }}>Password*</label>
                        <div style={{ position: 'relative' }}>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                required
                                className="luxury-input"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={{ paddingRight: '2.5rem' }}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                style={{ position: 'absolute', right: '0.5rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#888', padding: '0.25rem', display: 'flex', alignItems: 'center' }}
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                            >
                                {showPassword ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                                        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                                        <line x1="1" y1="1" x2="23" y2="23"/>
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                                        <circle cx="12" cy="12" r="3"/>
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                        <a href="#" style={{ fontSize: '0.75rem', textDecoration: 'underline', color: '#555' }}>Forgot password?</a>
                    </div>

                    </div>

                    <button type="submit" disabled={loading} className="btn-primary" style={{ marginTop: '1rem', width: '100%', opacity: loading ? 0.7 : 1 }}>
                        {loading ? 'AUTHENTICATING...' : 'CONTINUE'}
                    </button>
                </form>

                <div style={{ textAlign: 'center', marginTop: '3rem', fontSize: '0.875rem' }}>
                    <p>Don't have an account yet? <Link to="/register" style={{ fontWeight: 600, textDecoration: 'underline', color: 'var(--color-pitch-black)' }}>Create Account</Link></p>
                    <p style={{ marginTop: '1rem', color: '#666' }}>Administrator? Simply securely log in with your credentials above. <br/>Not an Admin yet? Use the Register option.</p>
                </div>
            </div>
        </div>
    );
};

export default Login;
