import React from 'react';

const ProductDetail = () => {
    return (
        <div style={{ padding: '4rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', minHeight: '80vh', animation: 'fadeIn 0.5s ease-in' }}>
            {/* Left Column: Image */}
            <div style={{ backgroundColor: 'var(--color-dusty-pink)', minHeight: '600px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <span style={{ letterSpacing: '0.1em', opacity: 0.6, fontSize: '1.25rem' }}>PRODUCT IMAGE</span>
            </div>

            {/* Right Column: Details */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <h1 style={{ fontSize: '3rem', marginBottom: '0.5rem', fontWeight: 400 }}>Signature Piece</h1>
                <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', marginBottom: '2.5rem', color: '#222' }}>$1,250</p>

                <p style={{ lineHeight: '1.8', marginBottom: '2.5rem', color: '#444', fontSize: '1.05rem' }}>
                    Impeccably crafted from the finest materials. This signature piece offers a timeless aesthetic
                    and unparalleled comfort, redefining luxury for the modern era.
                </p>

                <div style={{ marginBottom: '3rem' }}>
                    <p style={{ fontSize: '0.875rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>Colors</p>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <div style={{ width: '30px', height: '30px', backgroundColor: '#000', border: '1px solid #ccc', cursor: 'pointer' }}></div>
                        <div style={{ width: '30px', height: '30px', backgroundColor: '#fff', border: '1px solid #ccc', cursor: 'pointer' }}></div>
                        <div style={{ width: '30px', height: '30px', backgroundColor: '#D3C2C2', border: '1px solid #ccc', cursor: 'pointer' }}></div>
                        <div style={{ width: '30px', height: '30px', backgroundColor: '#555', border: '1px solid #ccc', cursor: 'pointer' }}></div>
                    </div>
                </div>

                <button className="btn-primary" style={{ width: '100%', marginBottom: '2rem', padding: '1.5rem', fontSize: '1.1rem' }}>
                    Add To Cart
                </button>

                <div style={{ borderTop: '1px solid #eaeaea', paddingTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.875rem' }}>
                    <a href="#" style={{ textDecoration: 'underline', color: '#555', letterSpacing: '0.05em' }}>Delivered By Farout</a>
                    <a href="#" style={{ textDecoration: 'underline', color: '#555', letterSpacing: '0.05em' }}>Return Policy</a>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
