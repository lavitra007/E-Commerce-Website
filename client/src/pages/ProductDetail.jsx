import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { FiHeart, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { products, cart, addToCart, wishlist, toggleWishlist, updateQuantity } = useContext(ShopContext);
    
    const [product, setProduct] = useState(null);
    const [currentImgIdx, setCurrentImgIdx] = useState(0);
    const [userInfo, setUserInfo] = useState(null);
    const [showAuthModal, setShowAuthModal] = useState(false);
    
    // Variant Selection State
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');

    useEffect(() => {
        const storedUser = localStorage.getItem('userInfo');
        if (storedUser) setUserInfo(JSON.parse(storedUser));

        const found = products.find(p => p._id === id);
        if (found) {
            setProduct(found);
            if (found.sizes && found.sizes.length > 0) setSelectedSize(found.sizes[0]);
            if (found.colors && found.colors.length > 0) setSelectedColor(found.colors[0]);
        } else {
            navigate('/collection');
        }
    }, [id, products, navigate]);

    if (!product) return null;

    const isWishlisted = wishlist.some(item => item._id === product._id);
    const currentCartId = `${product._id}-${selectedSize}-${selectedColor}`;
    const cartItem = cart.find(item => `${item._id}-${item.selectedSize || ''}-${item.selectedColor || ''}` === currentCartId);

    const handleAction = (actionFn) => {
        if (!userInfo) {
            setShowAuthModal(true);
            return;
        }
        actionFn();
    };

    const nextImg = () => setCurrentImgIdx((prev) => (prev + 1) % product.images.length);
    const prevImg = () => setCurrentImgIdx((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));

    return (
        <div style={{ position: 'relative' }}>
        {showAuthModal && (
            <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 100 }}>
                <div style={{ backgroundColor: '#fff', padding: '3rem', maxWidth: '400px', width: '90%', textAlign: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontWeight: 400 }}>Authentication Required</h2>
                    <p style={{ color: '#666', marginBottom: '2rem', lineHeight: 1.6 }}>You need to sign in for accessing the cart and wishlist features.</p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                        <button onClick={() => setShowAuthModal(false)} style={{ padding: '0.75rem 1.5rem', border: '1px solid #ccc', backgroundColor: '#fff', cursor: 'pointer' }}>Cancel</button>
                        <button onClick={() => navigate('/login')} style={{ padding: '0.75rem 1.5rem', border: '1px solid #000', backgroundColor: '#000', color: '#fff', cursor: 'pointer' }}>Go to Login</button>
                    </div>
                </div>
            </div>
        )}

        <div style={{ padding: '4rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', minHeight: '80vh', animation: 'fadeIn 0.5s ease-in' }}>
            {/* Left Column: Image Carousel */}
            <div style={{ position: 'relative', backgroundImage: `url(${product.images[currentImgIdx]})`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '600px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 1rem' }}>
                <button onClick={prevImg} style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(0,0,0,0.2)', color: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', border: 'none', transition: 'background-color 0.2s' }} onMouseOver={e => e.currentTarget.style.backgroundColor='rgba(0,0,0,0.5)'} onMouseOut={e => e.currentTarget.style.backgroundColor='rgba(0,0,0,0.2)'}><FiChevronLeft size={24} /></button>
                <button onClick={nextImg} style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(0,0,0,0.2)', color: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', border: 'none', transition: 'background-color 0.2s' }} onMouseOver={e => e.currentTarget.style.backgroundColor='rgba(0,0,0,0.5)'} onMouseOut={e => e.currentTarget.style.backgroundColor='rgba(0,0,0,0.2)'}><FiChevronRight size={24} /></button>
            </div>

            {/* Right Column: Details matching wireframe */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', paddingTop: '2rem', paddingRight: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
                    <div style={{ flexGrow: 1 }} />
                    <button onClick={() => handleAction(() => toggleWishlist(product))} style={{ cursor: 'pointer', backgroundColor: '#e9eaec', borderRadius: '50%', width: '45px', height: '45px', display: 'flex', justifyContent: 'center', alignItems: 'center', transition: 'transform 0.2s', border: 'none' }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}>
                        {isWishlisted ? <FaHeart size={18} color="#000" /> : <FiHeart size={18} color="#000" />}
                    </button>
                </div>
                
                <h1 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', fontWeight: 400 }}>{product.name}</h1>
                <p style={{ lineHeight: '1.8', marginBottom: '1rem', color: '#444', fontSize: '1.05rem', maxWidth: '85%' }}>
                    {product.description || "Impeccably crafted from the finest materials. This signature piece offers a timeless aesthetic and unparalleled comfort, redefining luxury for the modern era."}
                </p>
                
                <p style={{ color: '#666', fontSize: '0.875rem', marginBottom: '2rem', letterSpacing: '0.05em' }}>Stock Availability: <span style={{ color: product.stock > 0 ? '#2e7d32' : '#c62828' }}>{product.stock > 0 ? `${product.stock} In Stock` : 'Out of Stock'}</span></p>

                <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', marginBottom: '2.5rem', color: '#111' }}>₹{product.price.toLocaleString()}</p>

                <div style={{ marginBottom: '2.5rem' }}>
                    <p style={{ fontSize: '1rem', marginBottom: '1rem', fontWeight: 400 }}>Color</p>
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        {(product.colors && product.colors.length > 0 ? product.colors : ['Classic', 'Gold', 'Silver', 'Rose']).map(color => (
                            <button 
                                key={color} 
                                onClick={() => setSelectedColor(color)}
                                style={{ 
                                    border: selectedColor === color ? '2px solid #000' : '1px solid #ccc', 
                                    padding: '0.5rem 1rem', 
                                    cursor: 'pointer', 
                                    backgroundColor: selectedColor === color ? '#000' : '#fff', 
                                    color: selectedColor === color ? '#fff' : '#000',
                                    transition: 'all 0.2s', 
                                    fontSize: '0.875rem' 
                                }}
                            >
                                {color}
                            </button>
                        ))}
                    </div>
                </div>

                <div style={{ marginBottom: '3rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <p style={{ fontSize: '1rem', fontWeight: 400 }}>Size</p>
                        <p onClick={() => alert("Size Guide Scale:\n\nUS 5: 15.7mm / 0.62\" \nUS 6: 16.5mm / 0.65\"\nUS 7: 17.3mm / 0.68\"\nUS 8: 18.1mm / 0.71\"\nUS 9: 19.0mm / 0.75\"")} style={{ fontSize: '0.875rem', color: '#666', textDecoration: 'underline', cursor: 'pointer' }}>Find Size</p>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        {(product.sizes && product.sizes.length > 0 ? product.sizes : ['US 5', 'US 6', 'US 7', 'US 8', 'US 9']).map(size => (
                            <button 
                                key={size} 
                                onClick={() => setSelectedSize(size)}
                                style={{ 
                                    border: selectedSize === size ? '2px solid #000' : '1px solid #ccc', 
                                    padding: '0.5rem 1rem', 
                                    cursor: 'pointer', 
                                    backgroundColor: selectedSize === size ? '#000' : '#fff', 
                                    color: selectedSize === size ? '#fff' : '#000',
                                    transition: 'all 0.2s', 
                                    fontSize: '0.875rem' 
                                }}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                </div>

                {cartItem ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '3rem', width: '100%', maxWidth: '300px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid #000', padding: '0.5rem', backgroundColor: '#f9f9f9' }}>
                            <button onClick={() => updateQuantity(currentCartId, cartItem.quantity - 1)} style={{ width: '40px', height: '40px', cursor: 'pointer', backgroundColor: 'transparent', border: 'none', fontSize: '1.5rem', transition: 'color 0.2s' }} onMouseOver={e=>e.currentTarget.style.color='#666'} onMouseOut={e=>e.currentTarget.style.color='#000'}>-</button>
                            <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem' }}>{cartItem.quantity}</span>
                            <button onClick={() => updateQuantity(currentCartId, cartItem.quantity + 1)} style={{ width: '40px', height: '40px', cursor: 'pointer', backgroundColor: 'transparent', border: 'none', fontSize: '1.5rem', transition: 'color 0.2s' }} onMouseOver={e=>e.currentTarget.style.color='#666'} onMouseOut={e=>e.currentTarget.style.color='#000'}>+</button>
                        </div>
                        <button onClick={() => navigate('/cart')} style={{ backgroundColor: '#f5f5f5', border: '1px solid #ddd', padding: '1rem', cursor: 'pointer', fontSize: '1rem', color: '#333', transition: 'background-color 0.2s' }} onMouseOver={e=>e.currentTarget.style.backgroundColor='#eaeaea'} onMouseOut={e=>e.currentTarget.style.backgroundColor='#f5f5f5'}>
                            Check Cart
                        </button>
                    </div>
                ) : (
                    <button onClick={() => handleAction(() => addToCart({...product, selectedSize, selectedColor}))} className="btn-primary" style={{ width: '100%', maxWidth: '300px', marginBottom: '3rem', padding: '1rem', fontSize: '1.1rem', backgroundColor: '#000', color: '#fff' }}>
                        Add To Cart
                    </button>
                )}

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', fontSize: '1rem', color: '#333' }}>
                    <span style={{ borderBottom: '1px solid #ddd', paddingBottom: '1rem', cursor: 'pointer' }}>Delivered By</span>
                    <span style={{ borderBottom: '1px solid #ddd', paddingBottom: '1rem', cursor: 'pointer' }}>Return Policy</span>
                </div>
            </div>
        </div>
        </div>
    );
};

export default ProductDetail;
