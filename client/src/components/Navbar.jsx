import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiUser, FiHeart, FiShoppingCart } from 'react-icons/fi';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

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
                backgroundColor: '#ffffff', // Clean white
                color: '#000', 
                padding: '2rem', 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                boxShadow: '0 4px 15px rgba(0,0,0,0.03)', 
                position: 'relative',
                zIndex: 1
            }}>
                <div style={{ width: '120px' }}>{/* Spacer for centering */}</div>
                <Link to="/" style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', fontWeight: 600, letterSpacing: '0.12em', color: '#000' }}>
                    FAROUT LUXURIES
                </Link>
                <div style={{ display: 'flex', gap: '1.5rem', width: '120px', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <Link to="/account" style={{ color: '#000', display: 'flex', alignItems: 'center', transition: 'transform 0.2s', cursor: 'pointer' }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}>
                        <FiUser size={20} />
                    </Link>
                    <Link to="/wishlist" style={{ color: '#000', display: 'flex', alignItems: 'center', transition: 'transform 0.2s', cursor: 'pointer' }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}>
                        <FiHeart size={20} />
                    </Link>
                    <Link to="/cart" style={{ color: '#000', display: 'flex', alignItems: 'center', transition: 'transform 0.2s', cursor: 'pointer' }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}>
                        <FiShoppingCart size={20} />
                    </Link>
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
                transition: 'opacity 0.4s ease, box-shadow 0.4s ease',
                opacity: scrolled ? 0.95 : 1,
                boxShadow: scrolled ? '0 4px 15px rgba(0,0,0,0.05)' : 'none'
            }}>
                <Link to="/collection?category=fashion" style={{ position: 'relative', transition: 'opacity 0.3s ease', opacity: 0.8, paddingBottom: '2px' }} onMouseOver={e => { e.currentTarget.style.opacity = 1; e.currentTarget.style.textDecoration = 'underline'; e.currentTarget.style.textUnderlineOffset = '4px'; }} onMouseOut={e => { e.currentTarget.style.opacity = 0.8; e.currentTarget.style.textDecoration = 'none'; }}>Fashion</Link>
                <Link to="/collection?category=daily-wear" style={{ position: 'relative', transition: 'opacity 0.3s ease', opacity: 0.8, paddingBottom: '2px' }} onMouseOver={e => { e.currentTarget.style.opacity = 1; e.currentTarget.style.textDecoration = 'underline'; e.currentTarget.style.textUnderlineOffset = '4px'; }} onMouseOut={e => { e.currentTarget.style.opacity = 0.8; e.currentTarget.style.textDecoration = 'none'; }}>Daily Wear</Link>
                <Link to="/collection?category=fine-jewelry" style={{ position: 'relative', transition: 'opacity 0.3s ease', opacity: 0.8, paddingBottom: '2px' }} onMouseOver={e => { e.currentTarget.style.opacity = 1; e.currentTarget.style.textDecoration = 'underline'; e.currentTarget.style.textUnderlineOffset = '4px'; }} onMouseOut={e => { e.currentTarget.style.opacity = 0.8; e.currentTarget.style.textDecoration = 'none'; }}>Fine Jewelry</Link>
                <Link to="/collection?category=earrings" style={{ position: 'relative', transition: 'opacity 0.3s ease', opacity: 0.8, paddingBottom: '2px' }} onMouseOver={e => { e.currentTarget.style.opacity = 1; e.currentTarget.style.textDecoration = 'underline'; e.currentTarget.style.textUnderlineOffset = '4px'; }} onMouseOut={e => { e.currentTarget.style.opacity = 0.8; e.currentTarget.style.textDecoration = 'none'; }}>Earrings</Link>
                <Link to="/collection?category=wedding" style={{ position: 'relative', transition: 'opacity 0.3s ease', opacity: 0.8, paddingBottom: '2px' }} onMouseOver={e => { e.currentTarget.style.opacity = 1; e.currentTarget.style.textDecoration = 'underline'; e.currentTarget.style.textUnderlineOffset = '4px'; }} onMouseOut={e => { e.currentTarget.style.opacity = 0.8; e.currentTarget.style.textDecoration = 'none'; }}>Wedding</Link>
            </nav>
        </>
    );
};

export default Navbar;
