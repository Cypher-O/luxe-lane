import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from './components/Auth'
import Dashboard from './components/Dashboard';
import PrivateRoute from './PrivateRoute';
import './App.css';

const App = () => {
    return (
      <div className="app-container">
        <Router>
            <Routes>
                <Route path="/" element={<Auth />} />
                <Route path="/dashboard" element={<PrivateRoute element={Dashboard} />} />
            </Routes>
        </Router>
      </div>
    );
};

export default App;
