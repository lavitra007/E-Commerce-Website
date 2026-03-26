import React from 'react';

const Cart = () => {
    return (
        <div style={{ padding: '4rem', display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '4rem', minHeight: '80vh', animation: 'fadeIn 0.5s ease-in' }}>
            {/* Left: Items */}
            <div>
                <h1 style={{ fontSize: '2rem', marginBottom: '3rem', borderBottom: '2px solid #000', paddingBottom: '1rem', fontWeight: 400 }}>Shopping Cart (2 Items)</h1>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    {[1, 2].map(item => (
                        <div key={item} style={{ display: 'flex', gap: '2rem', borderBottom: '1px solid #eaeaea', paddingBottom: '2rem' }}>
                            <div style={{ backgroundColor: 'var(--color-dusty-pink)', width: '180px', height: '240px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <span style={{ fontSize: '0.75rem', color: '#000', opacity: 0.5 }}>IMG</span>
                            </div>
                            <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                <div>
                                    <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', fontWeight: 400 }}>Signature Piece {item}</h3>
                                    <p style={{ color: '#666', fontSize: '0.875rem', letterSpacing: '0.05em' }}>Color: Black</p>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: '#111' }}>$1,250</p>
                                    <button style={{ textDecoration: 'underline', fontSize: '0.875rem', color: '#555' }}>Remove</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right: Summary */}
            <div>
                <div style={{ backgroundColor: '#f9f9f9', padding: '2.5rem', position: 'sticky', top: '2rem', border: '1px solid #eaeaea' }}>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '2.5rem', fontWeight: 400, letterSpacing: '0.05em' }}>Order Summary</h2>

                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                        <span style={{ color: '#555' }}>Subtotal</span>
                        <span>$2,500</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                        <span style={{ color: '#555' }}>Shipping</span>
                        <span>Calculated at checkout</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', paddingBottom: '1.5rem', borderBottom: '1px solid #ddd' }}>
                        <span style={{ color: '#555' }}>Tax</span>
                        <span>$0</span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3rem', fontSize: '1.5rem', fontWeight: 600 }}>
                        <span>Total</span>
                        <span style={{ fontFamily: 'var(--font-serif)' }}>$2,500</span>
                    </div>

                    <button className="btn-primary" style={{ width: '100%', padding: '1.5rem', marginBottom: '2.5rem', fontSize: '1.1rem' }}>
                        CHECKOUT
                    </button>

                    {/* Payment Icons */}
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                        <div style={{ width: '50px', height: '30px', backgroundColor: '#e0e0e0', borderRadius: '4px' }}></div>
                        <div style={{ width: '50px', height: '30px', backgroundColor: '#e0e0e0', borderRadius: '4px' }}></div>
                        <div style={{ width: '50px', height: '30px', backgroundColor: '#e0e0e0', borderRadius: '4px' }}></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
