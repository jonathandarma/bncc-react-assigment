import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductForm = ({ product, onAddProduct, onEditProduct }) => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    if (product) {
      setTitle(product.title);
      setPrice(product.price);
      setDescription(product.description);
      setImage(product.images[0] || '');
    } else {
      setTitle('');
      setPrice('');
      setDescription('');
      setImage('');
    }
  }, [product]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      title,
      price: Number(price),
      description,
      categoryId: 1, // kamu bisa sesuaikan
      images: [image]
    };

    try {
      if (product) {
        // UPDATE Product
        await axios.put(`https://api.escuelajs.co/api/v1/products/${product.id}`, payload);
        onEditProduct(null); // Reset form
      } else {
        // ADD New Product
        await axios.post('https://api.escuelajs.co/api/v1/products/', payload);
        onAddProduct(); // Refresh product list
      }
    } catch (error) {
      console.error('Error submitting product:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
      <h3 className="text-xl font-semibold mb-4">{product ? 'Edit Product' : 'Add Product'}</h3>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Title</label>
        <input
          type="text"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Price</label>
        <input
          type="number"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Description</label>
        <textarea
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Image URL</label>
        <input
          type="text"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          {product ? 'Update Product' : 'Add Product'}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
