import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        // Check if user is already authenticated
        if (localStorage.getItem('isAuthenticated') === 'admin') {
            navigate('/admin');
        }
        else {
            navigate('/');
        }
    }, [navigate]);

    const handleLogin = (e) => {

        e.preventDefault();
        // Simulate login process, you can replace this with actual authentication
        if (username === 'admin' && password === 'admin') {
            localStorage.setItem('isAuthenticated', 'admin');
            navigate('/admin');
        } else {
            localStorage.setItem('isAuthenticated', 'user');
            navigate('/user');
        }
    };

    return (
        // <div>
        //     <h2>Login</h2>
        //     <form onSubmit={handleLogin}>
        //         <input
        //             type="text"
        //             placeholder="Username"
        //             value={username}
        //             onChange={(e) => setUsername(e.target.value)}
        //         />
        //         <input
        //             type="password"
        //             placeholder="Password"
        //             value={password}
        //             onChange={(e) => setPassword(e.target.value)}
        //         />
        //         <button type="submit">Login</button>
        //     </form>
        // </div>
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center text-gray-700">Login</h2>
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label htmlFor="username" className="block text-sm font-semibold text-gray-600">Username</label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="mt-2 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Enter your username"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-semibold text-gray-600">Password</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="mt-2 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Enter your password"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
