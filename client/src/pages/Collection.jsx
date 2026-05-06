import React, { useContext, useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { FiHeart, FiChevronDown, FiChevronUp, FiFilter } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';

const Collection = () => {
    const { products, wishlist, toggleWishlist } = useContext(ShopContext);
    const [searchParams, setSearchParams] = useSearchParams();
    const categoryQuery = searchParams.get('category');
    
    const [hoveredProduct, setHoveredProduct] = useState(null);
    const [sortType, setSortType] = useState('Recommended');
    const [showSort, setShowSort] = useState(false);
    const [gridCols, setGridCols] = useState(4);
    const [showFilters, setShowFilters] = useState(false);
    const [activeCategory, setActiveCategory] = useState(categoryQuery || '');

    useEffect(() => {
        if (categoryQuery) {
            setActiveCategory(categoryQuery);
        }
    }, [categoryQuery]);

    const getFilteredAndSortedProducts = () => {
        let filtered = [...products];
        if (activeCategory) {
            filtered = filtered.filter(p => p.category.toLowerCase() === activeCategory.toLowerCase());
        }
        switch(sortType) {
            case 'Price Low to High':
                return filtered.sort((a, b) => a.price - b.price);
            case 'Price High to Low':
                return filtered.sort((a, b) => b.price - a.price);
            case 'New In':
                return filtered.sort((a, b) => b._id.localeCompare(a._id));
            case 'Recommended':
            default:
                return filtered;
        }
    };

    const displayProducts = getFilteredAndSortedProducts();

    return (
        <div style={{ padding: '4rem', minHeight: '80vh', animation: 'fadeIn 0.5s ease-in' }}>
            <h1 style={{ textAlign: 'center', fontSize: '3rem', marginBottom: '3rem', fontWeight: 400 }}>Latest Collection</h1>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', borderTop: '1px solid #eaeaea', borderBottom: '1px solid #eaeaea', padding: '1rem 0' }}>
                <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                    <button onClick={() => setShowFilters(!showFilters)} style={{ background: 'none', border: 'none', fontSize: '1.1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 500 }}>
                        <FiFilter /> Filter {activeCategory && '(1 Active)'}
                    </button>
                    {activeCategory && (
                        <button onClick={() => { setActiveCategory(''); setSearchParams({}); }} style={{ background: 'none', border: 'none', fontSize: '0.9rem', cursor: 'pointer', textDecoration: 'underline', color: '#666' }}>
                            Reset Filters
                        </button>
                    )}
                </div>
                
                <div style={{ position: 'relative' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                        <button onClick={() => setShowSort(!showSort)} style={{ background: 'none', border: 'none', fontSize: '1.1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 500 }}>
                            Sort By {showSort ? <FiChevronUp /> : <FiChevronDown />}
                        </button>
                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                            <span style={{ fontSize: '0.8rem', color: '#666', textTransform: 'uppercase', letterSpacing: '0.1em' }}>View</span>
                            <div 
                                onClick={() => setGridCols(4)}
                                style={{ display: 'flex', gap: '2px', cursor: 'pointer', opacity: gridCols === 4 ? 1 : 0.3, transition: 'opacity 0.3s' }}
                                title="4 Columns"
                            >
                                {[1,2,3,4].map(i => <div key={i} style={{width:'6px',height:'15px',backgroundColor:'#000'}}></div>)}
                            </div>
                            <div 
                                onClick={() => setGridCols(3)}
                                style={{ display: 'flex', gap: '2px', cursor: 'pointer', opacity: gridCols === 3 ? 1 : 0.3, transition: 'opacity 0.3s' }}
                                title="3 Columns"
                            >
                                {[1,2,3].map(i => <div key={i} style={{width:'8px',height:'15px',backgroundColor:'#000'}}></div>)}
                            </div>
                        </div>
                    </div>

                    {showSort && (
                        <div style={{ position: 'absolute', top: '100%', right: 0, backgroundColor: '#fff', border: '1px solid #eaeaea', padding: '1.5rem', width: '240px', zIndex: 10, display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '0.5rem', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                            {['New In', 'Price Low to High', 'Price High to Low', 'Recommended'].map(opt => (
                                <label key={opt} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', fontSize: '1rem', color: '#333' }}>
                                    <input type="radio" name="sort" checked={sortType === opt} onChange={() => { setSortType(opt); setShowSort(false); }} style={{ cursor: 'pointer', accentColor: '#000', width: '16px', height: '16px' }} />
                                    {opt}
                                </label>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {showFilters && (
                <div style={{ marginBottom: '3rem', animation: 'slideDown 0.4s ease-out' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <h4 style={{ fontWeight: 600, textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '0.1em' }}>Filter by Category</h4>
                        <button onClick={() => { setActiveCategory(''); setSearchParams({}); }} style={{ background: 'none', border: 'none', fontSize: '0.8rem', cursor: 'pointer', color: activeCategory ? '#000' : '#ccc', textDecoration: 'underline' }}>Clear All</button>
                    </div>
                    <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', 
                        gap: '1rem' 
                    }}>
                        {[
                            { name: 'Rings', img: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=400&auto=format&fit=crop' },
                            { name: 'Pendants', img: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=400&auto=format&fit=crop' },
                            { name: 'Bracelets', img: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=400&auto=format&fit=crop' },
                            { name: 'Earrings', img: 'https://images.unsplash.com/photo-1635767798638-3e25273a8236?q=80&w=400&auto=format&fit=crop' },
                            { name: 'Necklaces', img: 'https://images.unsplash.com/photo-1599643477877-537ef5278482?q=80&w=400&auto=format&fit=crop' }
                        ].map(cat => (
                            <div 
                                key={cat.name} 
                                onClick={() => {
                                    const nextCat = activeCategory === cat.name ? '' : cat.name;
                                    setActiveCategory(nextCat);
                                    setSearchParams(nextCat ? { category: nextCat } : {});
                                }}
                                style={{ 
                                    position: 'relative', 
                                    height: '100px', 
                                    cursor: 'pointer', 
                                    overflow: 'hidden',
                                    borderRadius: '4px',
                                    border: activeCategory === cat.name ? '2px solid #000' : '1px solid #eee',
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                <div style={{ 
                                    backgroundImage: `url(${cat.img})`, 
                                    backgroundSize: 'cover', 
                                    backgroundPosition: 'center', 
                                    width: '100%', 
                                    height: '100%',
                                    filter: activeCategory === cat.name ? 'grayscale(0)' : 'grayscale(100%) opacity(0.6)',
                                    transition: 'all 0.4s ease'
                                }} />
                                <div style={{ 
                                    position: 'absolute', 
                                    top: 0, left: 0, right: 0, bottom: 0, 
                                    display: 'flex', 
                                    justifyContent: 'center', 
                                    alignItems: 'center',
                                    backgroundColor: activeCategory === cat.name ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.2)',
                                    transition: 'all 0.3s ease'
                                }}>
                                    <span style={{ 
                                        color: activeCategory === cat.name ? '#fff' : '#000', 
                                        fontWeight: 600, 
                                        textTransform: 'uppercase', 
                                        fontSize: '0.75rem', 
                                        letterSpacing: '0.1em',
                                        textShadow: activeCategory === cat.name ? '0 1px 4px rgba(0,0,0,0.4)' : 'none'
                                    }}>{cat.name}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: `repeat(${gridCols}, 1fr)`, 
                gap: '2.5rem',
                transition: 'grid-template-columns 0.3s ease'
            }}>
                {displayProducts.map(product => {
                    const isWishlisted = wishlist.some(item => item._id === product._id);
                    const isHovered = hoveredProduct === product._id;

                    // Category Image Mapping Override
                    const categoryImages = {
                        'rings': 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800&auto=format&fit=crop',
                        'pendants': 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800&auto=format&fit=crop',
                        'bracelets': 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800&auto=format&fit=crop',
                        'earrings': 'https://images.unsplash.com/photo-1635767798638-3e25273a8236?q=80&w=800&auto=format&fit=crop',
                        'necklaces': 'https://images.unsplash.com/photo-1599643477877-537ef5278482?q=80&w=800&auto=format&fit=crop'
                    };
                    const productImg = categoryImages[product.category.toLowerCase()] || product.image;

                    return (
                        <div key={product._id} style={{ display: 'flex', flexDirection: 'column' }} onMouseOver={() => setHoveredProduct(product._id)} onMouseLeave={() => setHoveredProduct(null)}>
                            <div style={{ 
                                position: 'relative', 
                                backgroundImage: `url(${productImg})`, 
                                backgroundSize: 'cover', 
                                backgroundPosition: 'center', 
                                height: '400px', 
                                marginBottom: '1rem',
                                transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                                cursor: 'pointer',
                                borderRadius: '4px'
                            }} 
                            onMouseOver={e => e.currentTarget.style.transform = 'translateY(-8px)'} 
                            onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}>
                                
                                <Link to={`/product/${product._id}`} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} />

                                {isHovered && (
                                    <div 
                                        style={{ 
                                            position: 'absolute', 
                                            top: '1rem', 
                                            right: '1rem', 
                                            width: '36px', 
                                            height: '36px', 
                                            borderRadius: '50%', 
                                            backgroundColor: '#fff', 
                                            display: 'flex', 
                                            justifyContent: 'center', 
                                            alignItems: 'center', 
                                            cursor: 'pointer', 
                                            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                                            zIndex: 2,
                                            transition: 'transform 0.2s'
                                        }}
                                        onClick={(e) => {
                                            e.preventDefault(); // Prevent triggering standard Link navigation
                                            toggleWishlist(product);
                                        }}
                                        onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1)'} 
                                        onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                                    >
                                        {isWishlisted ? <FaHeart size={18} color="#000" /> : <FiHeart size={18} color="#000" />}
                                    </div>
                                )}
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <div>
                                    <Link to={`/product/${product._id}`} style={{ fontSize: '1.1rem', fontWeight: 600, display: 'block', marginBottom: '0.25rem', color: '#000', textDecoration: 'none' }}>{product.name}</Link>
                                    <span style={{ color: '#666', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{product.category}</span>
                                </div>
                                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem' }}>₹{product.price.toLocaleString()}</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Collection;
