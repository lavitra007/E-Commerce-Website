import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: '4rem', animation: 'fadeIn 0.5s ease-in' }}>
      {/* Hero Section */}
      <section style={{
        backgroundColor: 'var(--color-dusty-pink)',
        minHeight: '65vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '2rem 4rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ textAlign: 'center', zIndex: 1 }}>
          <h1 style={{ fontSize: '3.5rem', marginBottom: '2.5rem', color: 'var(--color-pitch-black)', fontWeight: 400 }}>The New Standard</h1>
          <Link to="/collection">
            <button className="btn-primary">Discover More</button>
          </Link>
        </div>
      </section>

      {/* Gallery Grid Section */}
      <section style={{ padding: '2rem 4rem' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '2rem', fontWeight: 400, letterSpacing: '0.05em' }}>Curated Selections</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '2rem',
          gridAutoRows: '400px'
        }}>
          {/* Image Placeholders with gentle hover effect */}
          <div style={{ backgroundColor: '#f9f9f9', display: 'flex', justifyContent: 'center', alignItems: 'center', transition: 'transform 0.3s ease', cursor: 'pointer' }} onMouseOver={e => e.currentTarget.style.transform = 'scale(0.98)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}>
            <span style={{ color: '#999', letterSpacing: '0.1em', uppercase: 'true' }}>Collection I</span>
          </div>
          <div style={{ backgroundColor: '#f4f4f4', display: 'flex', justifyContent: 'center', alignItems: 'center', transition: 'transform 0.3s ease', cursor: 'pointer' }} onMouseOver={e => e.currentTarget.style.transform = 'scale(0.98)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}>
            <span style={{ color: '#999', letterSpacing: '0.1em' }}>Collection II</span>
          </div>
          <div style={{ backgroundColor: '#efefef', gridColumn: 'span 2', display: 'flex', justifyContent: 'center', alignItems: 'center', transition: 'transform 0.3s ease', cursor: 'pointer' }} onMouseOver={e => e.currentTarget.style.transform = 'scale(0.99)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}>
            <span style={{ color: '#888', letterSpacing: '0.1em' }}>Exclusive Release</span>
          </div>
        </div>
      </section>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
    </div>
  );
};

export default Home;