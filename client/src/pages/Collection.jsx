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
    const [gridCols, setGridCols] = useState(3);
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
                return sorted.sort((a, b) => a.price - b.price);
            case 'Price High to Low':
                return sorted.sort((a, b) => b.price - a.price);
            case 'New In':
                return sorted.sort((a, b) => b._id.localeCompare(a._id));
            case 'Recommended':
            default:
                return sorted;
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
                        <div style={{ display: 'flex', gap: '0.2rem' }}>
                            {/* Grid toggle icons */}
                            <div 
                                onClick={() => setGridCols(4)}
                                style={{ display: 'flex', gap: '2px', cursor: 'pointer', opacity: gridCols === 4 ? 1 : 0.3 }}
                                title="View 4 Columns"
                            >
                                <div style={{width:'8px',height:'8px',backgroundColor:'#000'}}></div>
                                <div style={{width:'8px',height:'8px',backgroundColor:'#000'}}></div>
                                <div style={{width:'8px',height:'8px',backgroundColor:'#000'}}></div>
                                <div style={{width:'8px',height:'8px',backgroundColor:'#000'}}></div>
                            </div>
                            <div 
                                onClick={() => setGridCols(2)}
                                style={{ display: 'flex', gap: '2px', marginLeft:'0.5rem', cursor: 'pointer', opacity: gridCols === 2 ? 1 : 0.3 }}
                                title="View 2 Columns"
                            >
                                <div style={{width:'12px',height:'8px',border:'1px solid #000', backgroundColor: '#000'}}></div>
                                <div style={{width:'12px',height:'8px',border:'1px solid #000', backgroundColor: '#000'}}></div>
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
                <div style={{ marginBottom: '3rem', padding: '2rem', backgroundColor: '#f9f9f9', display: 'flex', gap: '2rem' }}>
                    <div>
                        <h4 style={{ marginBottom: '1rem', fontWeight: 600, textTransform: 'uppercase', fontSize: '0.875rem', letterSpacing: '0.05em' }}>Categories</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            {['Fine Jewelry', 'Daily Wear', 'Wedding', 'Earrings'].map(cat => (
                                <label key={cat} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.9rem', color: '#333' }}>
                                    <input 
                                        type="radio" 
                                        name="category_filter" 
                                        checked={activeCategory === cat} 
                                        onChange={() => {
                                            setActiveCategory(cat);
                                            setSearchParams({ category: cat });
                                        }} 
                                        style={{ accentColor: '#000' }} 
                                    />
                                    {cat}
                                </label>
                            ))}
                        </div>
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

                    return (
                        <div key={product._id} style={{ display: 'flex', flexDirection: 'column' }} onMouseOver={() => setHoveredProduct(product._id)} onMouseLeave={() => setHoveredProduct(null)}>
                            <div style={{ 
                                position: 'relative', 
                                backgroundImage: `url(${product.image})`, 
                                backgroundSize: 'cover', 
                                backgroundPosition: 'center', 
                                height: '400px', 
                                marginBottom: '1rem',
                                transition: 'transform 0.3s ease',
                                cursor: 'pointer'
                            }} 
                            onMouseOver={e => e.currentTarget.style.transform = 'translateY(-5px)'} 
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
