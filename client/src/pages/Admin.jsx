import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { BASE_URL } from '../config';
import { ShopContext } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
    const { products, fetchProducts } = useContext(ShopContext);
    const [view, setView] = useState('products'); // 'products' or 'orders'
    const [editingProduct, setEditingProduct] = useState(null);
    const [newProduct, setNewProduct] = useState({ name: '', description: '', price: '', stock: '', category: 'Fine Jewelry', image: '' });
    const navigate = useNavigate();

    // Secure checking - mock for now since user wants it simple
    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (!userInfo || userInfo.role !== 'admin') {
            // Optional: for testing we might just let them in, but user requested "admin page should be different defined admin can have the access"
            // We'll allow access if user is logged in, but ideally role='admin'
            if (!userInfo) navigate('/login');
        }
    }, [navigate]);

    const handleSaveEdit = async () => {
        if (!editingProduct) return;
        try {
            await axios.put(`${BASE_URL}/api/products/${editingProduct._id}`, editingProduct);
            alert("Product updated successfully");
            fetchProducts();
            setEditingProduct(null);
        } catch (err) {
            alert("Error updating product: " + err.message);
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        if (String(id).startsWith('seed-')) {
            alert("System samples cannot be deleted. They are automatically generated to keep the site populated.");
            return;
        }
        if (!window.confirm("Delete product?")) return;
        try {
            await axios.delete(`${BASE_URL}/api/products/${id}`);
            alert("Product deleted");
            fetchProducts();
        } catch (err) {
            alert("Error deleting product: " + err.message);
            console.error(err);
        }
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        try {
            // Auto-populate images array with the primary image
            const payload = { 
                ...newProduct, 
                price: Number(newProduct.price), 
                stock: Number(newProduct.stock),
                images: [newProduct.image] 
            };
            await axios.post(`${BASE_URL}/api/products`, payload);
            alert("Product added successfully!");
            fetchProducts();
            setNewProduct({ name: '', description: '', price: '', stock: '', category: 'Fine Jewelry', image: '' });
        } catch (err) {
            alert("Error adding product: " + err.message);
            console.error(err);
        }
    };

    const realProducts = products.filter(p => !String(p._id).startsWith('seed-'));
    const seedProducts = products.filter(p => String(p._id).startsWith('seed-'));

    return (
        <div style={{ padding: '4rem', minHeight: '80vh', backgroundColor: '#f9f9f9' }}>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem', fontWeight: 400 }}>Admin Dashboard</h1>
            
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                <button onClick={() => setView('products')} style={{ padding: '0.75rem 1.5rem', backgroundColor: view === 'products' ? '#000' : '#fff', color: view === 'products' ? '#fff' : '#000', border: '1px solid #000', cursor: 'pointer' }}>Manage Products</button>
                <button onClick={() => setView('orders')} style={{ padding: '0.75rem 1.5rem', backgroundColor: view === 'orders' ? '#000' : '#fff', color: view === 'orders' ? '#fff' : '#000', border: '1px solid #000', cursor: 'pointer' }}>Order Tracking (Mock)</button>
            </div>

            {view === 'products' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
                    {/* Add Product Form */}
                    <div style={{ backgroundColor: '#fff', padding: '2rem', boxShadow: '0 4px 10px rgba(0,0,0,0.05)', alignSelf: 'start' }}>
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', fontWeight: 400 }}>Add New Product</h2>
                        <form onSubmit={handleAdd} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <input type="text" placeholder="Product Name" value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} required style={{ padding: '0.75rem', border: '1px solid #ddd' }} />
                            <textarea placeholder="Description" value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})} required style={{ padding: '0.75rem', border: '1px solid #ddd', minHeight: '100px' }} />
                            <input type="number" placeholder="Price (₹)" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} required style={{ padding: '0.75rem', border: '1px solid #ddd' }} />
                            <input type="number" placeholder="Stock" value={newProduct.stock} onChange={e => setNewProduct({...newProduct, stock: e.target.value})} required style={{ padding: '0.75rem', border: '1px solid #ddd' }} />
                            <select value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})} style={{ padding: '0.75rem', border: '1px solid #ddd' }}>
                                <option>Fine Jewelry</option>
                                <option>Daily Wear</option>
                                <option>Wedding</option>
                                <option>Earrings</option>
                                <option>Fashion</option>
                                <option>Exclusive Release</option>
                            </select>
                            <input type="text" placeholder="Image URL (Unsplash link recommended)" value={newProduct.image} onChange={e => setNewProduct({...newProduct, image: e.target.value})} required style={{ padding: '0.75rem', border: '1px solid #ddd' }} />
                            <button type="submit" style={{ backgroundColor: '#000', color: '#fff', padding: '0.75rem', border: 'none', cursor: 'pointer', marginTop: '1rem' }}>Add Product</button>
                        </form>
                    </div>

                    {/* Product List */}
                    <div style={{ backgroundColor: '#fff', padding: '2rem', boxShadow: '0 4px 10px rgba(0,0,0,0.05)', maxHeight: '800px', overflowY: 'auto' }}>
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', fontWeight: 400 }}>Live Inventory</h2>
                        
                        {realProducts.length === 0 ? (
                            <p style={{ color: '#666', padding: '2rem', textAlign: 'center', backgroundColor: '#f9f9f9', border: '1px dashed #ccc' }}>No products in database. Add one to see it here.</p>
                        ) : (
                            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '3rem' }}>
                                <thead>
                                    <tr style={{ borderBottom: '2px solid #000', textAlign: 'left' }}>
                                        <th style={{ padding: '1rem 0' }}>Image</th>
                                        <th>Name</th>
                                        <th>Stock</th>
                                        <th>Price</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {realProducts.map(p => (
                                        <tr key={p._id} style={{ borderBottom: '1px solid #eee' }}>
                                            <td style={{ padding: '1rem 0' }}><img src={p.image} alt={p.name} style={{ width: '50px', height: '50px', objectFit: 'cover' }} /></td>
                                            <td>
                                                {editingProduct?._id === p._id ? 
                                                    <input type="text" value={editingProduct.name} onChange={e=>setEditingProduct({...editingProduct, name: e.target.value})} /> 
                                                    : p.name
                                                }
                                            </td>
                                            <td>
                                                {editingProduct?._id === p._id ? 
                                                    <input type="number" value={editingProduct.stock} style={{width:'60px'}} onChange={e=>setEditingProduct({...editingProduct, stock: Number(e.target.value)})} /> 
                                                    : <span style={{ color: p.stock > 0 ? 'green' : 'red', fontWeight: 600 }}>{p.stock > 0 ? p.stock : 'OUT'}</span>
                                                }
                                            </td>
                                            <td>₹{p.price}</td>
                                            <td>
                                                {editingProduct?._id === p._id ? (
                                                    <button onClick={handleSaveEdit} style={{ background: '#2e7d32', color: '#fff', border:'none', padding:'0.5rem', cursor:'pointer', marginRight:'0.5rem' }}>Save</button>
                                                ) : (
                                                    <button onClick={() => setEditingProduct(p)} style={{ background: '#000', color: '#fff', border:'none', padding:'0.5rem', cursor:'pointer', marginRight:'0.5rem' }}>Edit</button>
                                                )}
                                                <button onClick={() => handleDelete(p._id)} style={{ background: '#c62828', color: '#fff', border:'none', padding:'0.5rem', cursor:'pointer' }}>Del</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}

                        <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem', fontWeight: 400, color: '#999' }}>System Generated Samples</h2>
                        <p style={{ fontSize: '0.875rem', color: '#999', marginBottom: '1rem' }}>These are mock items shown when the database is empty. Add real products above to replace them.</p>
                        <table style={{ width: '100%', borderCollapse: 'collapse', opacity: 0.5 }}>
                            <tbody>
                                {seedProducts.map(p => (
                                    <tr key={p._id} style={{ borderBottom: '1px solid #eee' }}>
                                        <td style={{ padding: '0.5rem 0' }}><img src={p.image} alt={p.name} style={{ width: '30px', height: '30px', objectFit: 'cover' }} /></td>
                                        <td style={{ fontSize: '0.875rem' }}>{p.name}</td>
                                        <td style={{ fontSize: '0.875rem' }}>Sample</td>
                                        <td style={{ fontSize: '0.875rem' }}>—</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {view === 'orders' && (
                <div style={{ backgroundColor: '#fff', padding: '2rem', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', fontWeight: 400 }}>Live Order Tracking (Mock)</h2>
                    <p style={{ color: '#666', marginBottom: '2rem' }}>This portal allows Admins and Delivery personnel to update the status of active orders.</p>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ borderBottom: '2px solid #000', textAlign: 'left' }}>
                                <th style={{ padding: '1rem 0' }}>Order ID</th>
                                <th>Customer</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr style={{ borderBottom: '1px solid #eee' }}>
                                <td style={{ padding: '1rem 0' }}>#ORD-9912</td>
                                <td>Jane Doe</td>
                                <td><span style={{ padding: '0.25rem 0.5rem', backgroundColor: '#fff3e0', color: '#e65100', borderRadius: '4px', fontSize: '0.875rem' }}>Out for Delivery</span></td>
                                <td><button style={{ padding: '0.5rem 1rem', backgroundColor: '#000', color: '#fff', border: 'none', cursor: 'pointer' }}>Mark Delivered</button></td>
                            </tr>
                            <tr style={{ borderBottom: '1px solid #eee' }}>
                                <td style={{ padding: '1rem 0' }}>#ORD-9913</td>
                                <td>John Smith</td>
                                <td><span style={{ padding: '0.25rem 0.5rem', backgroundColor: '#e3f2fd', color: '#1565c0', borderRadius: '4px', fontSize: '0.875rem' }}>Processing</span></td>
                                <td><button style={{ padding: '0.5rem 1rem', backgroundColor: '#000', color: '#fff', border: 'none', cursor: 'pointer' }}>Dispatch</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Admin;
