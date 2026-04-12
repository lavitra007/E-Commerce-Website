import React from 'react';
import { FaInstagram, FaYoutube, FaLinkedin, FaFacebook } from 'react-icons/fa';

const Footer = () => {
    const socialIcons = [
        { id: 1, Icon: FaInstagram },
        { id: 2, Icon: FaYoutube },
        { id: 3, Icon: FaLinkedin },
        { id: 4, Icon: FaFacebook }
    ];

    return (
        <footer style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column' }}>
            {/* Social Bar */}
            <div style={{ backgroundColor: '#181818', padding: '2rem', display: 'flex', justifyContent: 'center', gap: '1.5rem' }}>
                {socialIcons.map(({ id, Icon }) => (
                    <div key={id} style={{ color: '#fff', opacity: '0.6', transition: 'opacity 0.2s', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onMouseOver={(e) => e.currentTarget.style.opacity = '1'} onMouseOut={(e) => e.currentTarget.style.opacity = '0.6'}>
                        <Icon size={28} />
                    </div>
                ))}
            </div>
            {/* Footer Text */}
            <div style={{ padding: '3rem', textAlign: 'center', backgroundColor: '#000', color: '#fff' }}>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', letterSpacing: '0.15em', marginBottom: '1rem', fontWeight: 400 }}>FAROUT LUXURIES</h2>
                <p style={{ fontSize: '0.75rem', color: '#666', letterSpacing: '0.05em' }}>&copy; {new Date().getFullYear()} Farout Luxuries. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
