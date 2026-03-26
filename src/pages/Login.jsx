import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            // Save JWT token and user info
            localStorage.setItem('userInfo', JSON.stringify(response.data));
            navigate('/'); // Redirect to home page on success
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
                        <input
                            type="password"
                            required
                            className="luxury-input"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div style={{ textAlign: 'right' }}>
                        <a href="#" style={{ fontSize: '0.75rem', textDecoration: 'underline', color: '#555' }}>Forgot password?</a>
                    </div>

                    <button type="submit" disabled={loading} className="btn-primary" style={{ marginTop: '1rem', width: '100%', opacity: loading ? 0.7 : 1 }}>
                        {loading ? 'AUTHENTICATING...' : 'CONTINUE'}
                    </button>
                </form>

                <div style={{ textAlign: 'center', marginTop: '3rem', fontSize: '0.875rem' }}>
                    <p>Don't have an account yet? <Link to="/register" style={{ fontWeight: 600, textDecoration: 'underline', color: 'var(--color-pitch-black)' }}>Create Account</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;
