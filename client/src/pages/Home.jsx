import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import exclusiveReleaseImg from '../assets/exclusive-release.png';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: '4rem', animation: 'fadeIn 0.5s ease-in' }}>
      {/* Hero Section */}
      <section style={{
        backgroundImage: 'url("/hero-bg.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center 75%',
        minHeight: '80vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '2rem 4rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Overlay for better text readability */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.3)', zIndex: 1 }}></div>

        {/* Floating Content */}
        <div style={{ textAlign: 'center', zIndex: 2, position: 'absolute', bottom: '15%' }}>
          <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', color: '#fff', fontWeight: 400, letterSpacing: '0.05em', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>The New Standard</h1>
          <Link to="/collection">
            <button className="btn-primary" style={{ backgroundColor: '#fff', color: '#000' }}>Discover More</button>
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
          gridAutoRows: '500px'
        }}>
          {/* Collection I */}
          <div onClick={() => navigate('/collection?category=Fine+Jewelry')} style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800&auto=format&fit=crop")', backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', justifyContent: 'center', alignItems: 'flex-end', paddingBottom: '2rem', transition: 'transform 0.4s ease', cursor: 'pointer' }} onMouseOver={e => e.currentTarget.style.transform = 'scale(0.98)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}>
            <span style={{ color: '#fff', letterSpacing: '0.1em', textTransform: 'uppercase', backgroundColor: 'rgba(0,0,0,0.5)', padding: '0.5rem 1.5rem', fontSize: '0.875rem' }}>Fine Jewelry</span>
          </div>
          
          {/* Collection II */}
          <div onClick={() => navigate('/collection?category=Daily+Wear')} style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800&auto=format&fit=crop")', backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', justifyContent: 'center', alignItems: 'flex-end', paddingBottom: '2rem', transition: 'transform 0.4s ease', cursor: 'pointer' }} onMouseOver={e => e.currentTarget.style.transform = 'scale(0.98)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}>
            <span style={{ color: '#fff', letterSpacing: '0.1em', textTransform: 'uppercase', backgroundColor: 'rgba(0,0,0,0.5)', padding: '0.5rem 1.5rem', fontSize: '0.875rem' }}>Daily Wear</span>
          </div>
          
          {/* Exclusive Release */}
          <div onClick={() => navigate('/collection')} style={{ 
            backgroundImage: `url(${exclusiveReleaseImg})`, 
            backgroundSize: 'cover', 
            backgroundPosition: 'center', 
            gridColumn: 'span 2', 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)', 
            cursor: 'pointer', 
            position: 'relative',
            borderRadius: '4px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
          }} onMouseOver={e => {
            e.currentTarget.style.transform = 'scale(0.99)';
            e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.2)';
          }} onMouseOut={e => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
          }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.2)', transition: 'background-color 0.4s ease' }} onMouseOver={e => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.1)'} onMouseOut={e => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.2)'}></div>
            <div style={{ 
              zIndex: 1, 
              backgroundColor: 'rgba(255, 255, 255, 0.9)', 
              backdropFilter: 'blur(10px)',
              padding: '2.5rem 5rem', 
              textAlign: 'center',
              border: '1px solid rgba(255,255,255,0.3)',
              boxShadow: '0 15px 35px rgba(0,0,0,0.1)'
            }}>
              <span style={{ color: '#000', letterSpacing: '0.25em', fontSize: '1.5rem', textTransform: 'uppercase', fontWeight: 300 }}>Exclusive Release</span>
              <div style={{ width: '40px', height: '1px', backgroundColor: '#000', margin: '1rem auto 0', transition: 'width 0.4s ease' }}></div>
            </div>
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