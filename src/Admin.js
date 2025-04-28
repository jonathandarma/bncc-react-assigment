import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ProductForm from './ProductForm';
import ProductItem from './ProductItem';

const AdminPanel = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('isAuthenticated') !== 'admin') {
      navigate('/');
    } else {
      fetchProducts();
    }
  }, [navigate]);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://api.escuelajs.co/api/v1/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/');
  };

  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`https://api.escuelajs.co/api/v1/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product', error);
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
  };

  const handleAddProduct = (newProduct) => {
    setEditingProduct(null);
    
    fetchProducts();
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Navbar */}
      <nav className="bg-gray-800 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold">Admin Panel</div>
          <div>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto p-8">
        <h2 className="text-3xl font-bold mb-6 text-center">Admin Panel</h2>

        <div className="sm:flex sm:justify-center mb-6">
          <ProductForm
            product={editingProduct}
            onAddProduct={handleAddProduct}
            onEditProduct={handleEditProduct}
          />
        </div>

        {loading ? (
          <div className="flex justify-center items-center">
            <div className="animate-spin border-4 border-t-4 border-gray-200 rounded-full w-12 h-12 border-t-blue-500"></div>
          </div>
        ) : (
          <>
            <h3 className="text-xl font-semibold mb-4">Product List</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductItem
                  key={product.id}
                  product={product}
                  onEdit={handleEditProduct}
                  onDelete={handleDeleteProduct}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
