import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ProductItemUser from './ProductItemUsers';
import ProductCheckout from './ProductCheckout';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

 const handleCheckout = (totalPrice, setCheckout,setPrice) => {
    MySwal.fire({
        title: 'Checkout Form',
        html: `
      <input id="username" class="swal2-input" placeholder="Username" value="${localStorage.getItem('username') || ''}" readonly>
      <input id="fullName" class="swal2-input" placeholder="Full Name">
      <input id="phone" class="swal2-input" placeholder="Phone Number">
      <input id="email" class="swal2-input" placeholder="Email">
      <input id="address" class="swal2-input" placeholder="Address">
      <input id="bankAccount" class="swal2-input" placeholder="Bank Account">
    `,
        focusConfirm: false,
        preConfirm: () => {
            const username = document.getElementById('username').value;
            const fullName = document.getElementById('fullName').value;
            const phone = document.getElementById('phone').value;
            const email = document.getElementById('email').value;
            const address = document.getElementById('address').value;
            const bankAccount = document.getElementById('bankAccount').value;

            if (!fullName || !phone || !email || !address || !bankAccount) {
                Swal.showValidationMessage('Please fill out all fields');
                return false;
            }

            return { username, fullName, phone, email, address, bankAccount };
        },
        confirmButtonText: 'Submit',
        showCancelButton: true,
    }).then((result) => {
        if (result.isConfirmed) {
            const { fullName } = result.value;
            Swal.fire(
                'Success!',
                `Transaction success by ${fullName} with total price $${totalPrice}`,
                'success'
            );
            setCheckout(0  );
            setPrice(0);
        }
    });
};

const UserPanel = () => {
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    var [checkout, setCheckout] = useState(0);
    var [checkoutVisible, setCheckoutVisible] = useState(true);
    var [price, setPrice] = useState(0);


    useEffect(() => {
        if (localStorage.getItem('isAuthenticated') !== 'user') {
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

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Navbar */}
            <nav className="bg-gray-800 text-white p-4 shadow-md">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="text-2xl font-bold">User Area</div>
                    <div>
                        <button
                            onClick={handleLogout}
                            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none"
                        >
                            Logout
                        </button>
                        <button
                            onClick={() => {handleCheckout(price, setCheckout, setPrice)}}
                            className="bg-green-600 ml-2 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none"
                        >
                            checkout ({checkout})
                        </button>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="container mx-auto p-8">
                <ProductCheckout visible={checkoutVisible} totalPrice={price}></ProductCheckout>

                {loading ? (
                    <div className="flex justify-center items-center">
                        <div className="animate-spin border-4 border-t-4 border-gray-200 rounded-full w-12 h-12 border-t-blue-500"></div>
                    </div>
                ) : (
                    <>
                        <h3 className="text-xl font-semibold mb-4">Product List</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {products.map((product) => (
                                <ProductItemUser
                                    key={product.id}
                                    product={product}

                                    onAdd={() => {
                                        setCheckout(checkout + 1)
                                        setPrice(price + product.price)
                                    }}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default UserPanel;
