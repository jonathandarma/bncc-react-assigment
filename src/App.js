import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './LoginPage';
import AdminPanel from './Admin';
import UserPanel from './User';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<AdminPanel />} />

        <Route path="/user" element={<UserPanel />} />

      </Routes>
    </Router>
  );
};

export default App;
