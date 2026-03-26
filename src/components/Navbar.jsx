import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            {/* Top Header */}
            <div style={{ 
                backgroundImage: 'url("https://images.unsplash.com/photo-1598928636137-22665620e59a?q=80&w=2000&auto=format&fit=crop")', // Clean white/grey marble luxury texture
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                color: '#000', 
                padding: '2rem', 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                boxShadow: '0 10px 40px rgba(0,0,0,0.1)', // Floating effect
                position: 'relative',
                zIndex: 1
            }}>
                <div style={{ width: '100px' }}>{/* Spacer for centering */}</div>
                <Link to="/" style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', fontWeight: 600, letterSpacing: '0.12em', color: '#000', textShadow: '0px 2px 10px rgba(255,255,255,0.5)' }}>
                    FAROUT LUXURIES
                </Link>
                <div style={{ display: 'flex', gap: '1rem', width: '100px', justifyContent: 'flex-end' }}>
                    {/* User / Social Icons Placeholders */}
                    <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: '#000' }}></div>
                    <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: '#000' }}></div>
                    <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: '#000' }}></div>
                    <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: '#000' }}></div>
                </div>
            </div>

            {/* Navigation Links */}
            <nav style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                gap: '2.5rem', 
                padding: '1rem', 
                borderBottom: '1px solid #eaeaea', 
                fontSize: '0.875rem', 
                textTransform: 'uppercase', 
                letterSpacing: '0.05em',
                position: 'sticky',
                top: 0,
                zIndex: 1000,
                backgroundColor: '#fff',
                transition: 'opacity 0.4s ease',
                opacity: scrolled ? 0.9 : 1
            }}>
                <Link to="/" style={{ transition: 'opacity 0.2s', opacity: 0.8 }} onMouseOver={e => e.target.style.opacity = 1} onMouseOut={e => e.target.style.opacity = 0.8}>Home</Link>
                <Link to="/collection" style={{ transition: 'opacity 0.2s', opacity: 0.8 }} onMouseOver={e => e.target.style.opacity = 1} onMouseOut={e => e.target.style.opacity = 0.8}>Collection</Link>
                <Link to="/about" style={{ transition: 'opacity 0.2s', opacity: 0.8 }} onMouseOver={e => e.target.style.opacity = 1} onMouseOut={e => e.target.style.opacity = 0.8}>About</Link>
                <Link to="/wishlist" style={{ transition: 'opacity 0.2s', opacity: 0.8 }} onMouseOver={e => e.target.style.opacity = 1} onMouseOut={e => e.target.style.opacity = 0.8}>Wishlist</Link>
                <Link to="/login" style={{ transition: 'opacity 0.2s', opacity: 0.8 }} onMouseOver={e => e.target.style.opacity = 1} onMouseOut={e => e.target.style.opacity = 0.8}>Account</Link>
                <Link to="/cart" style={{ transition: 'opacity 0.2s', opacity: 0.8 }} onMouseOver={e => e.target.style.opacity = 1} onMouseOut={e => e.target.style.opacity = 0.8}>Cart</Link>
            </nav>
        </>
    );
};

export default Navbar;
