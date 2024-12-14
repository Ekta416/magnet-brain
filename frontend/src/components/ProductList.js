

import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import axios from 'axios';

const ProductList = () => {
  const { addToCart } = useContext(CartContext);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', price: '' });

  useEffect(() => {
    // Fetch products from API
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load products. Please try again later.');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  
  const handleCreateProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/products', {
        name: newProduct.name,
        price: parseFloat(newProduct.price),
      });
      setProducts([...products, response.data.product]);
      setShowCreateForm(false);
      setNewProduct({ name: '', price: ''});
    } catch (err) {
      alert('Failed to create product. Please try again.');
    }
  };
  
  return (
    <div style={{ padding: '20px' }}>
      <h2>Products</h2>
      <button
        style={{
          marginBottom: '20px',
          padding: '10px 15px',
          backgroundColor: '#28a745',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
        onClick={() => setShowCreateForm(!showCreateForm)}
      >
        {showCreateForm ? 'Cancel' : 'Create Product'}
      </button>

      {showCreateForm && (
        <form
          onSubmit={handleCreateProduct}
          style={{
            marginBottom: '20px',
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '5px',
          }}
        >
          <h3>Create New Product</h3>
          <input
            type="text"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            style={{
              marginRight: '10px',
              padding: '5px',
              border: '1px solid #ccc',
              borderRadius: '3px',
            }}
          />
          <input
            type="number"
            placeholder="Product Price"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            style={{
              marginRight: '10px',
              padding: '5px',
              border: '1px solid #ccc',
              borderRadius: '3px',
            }}
          />
          
          <button
            type="submit"
            style={{
              padding: '5px 10px',
              backgroundColor: '#007BFF',
              color: '#fff',
              border: 'none',
              borderRadius: '3px',
              cursor: 'pointer',
            }}
          >
            Save Product
          </button>
        </form>
      )}

      {loading && <p>Loading products...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && products.length === 0 && <p>No products available.</p>}
      {!loading &&
        !error &&
        products.map((product) => (
          <div
            key={product.id}
            style={{
              border: '1px solid #ccc',
              borderRadius: '5px',
              padding: '10px',
              marginBottom: '10px',
            }}
          >
            <h4>{product.name}</h4>
            <p>Price: ${product.price.toFixed(2)}</p>
            <button
              style={{
                padding: '5px 10px',
                backgroundColor: '#007BFF',
                color: '#fff',
                border: 'none',
                borderRadius: '3px',
                cursor: 'pointer',
              }}
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        ))}
    </div>
  );
};

export default ProductList;

