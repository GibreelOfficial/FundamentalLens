import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-gray-100">
        <header className="border-b border-gray-800 p-4 bg-gray-950 flex justify-between items-center">
          <h1 className="text-xl font-bold text-amber-500 tracking-wider">FUNDAMENTAL BEAST</h1>
          {token && (
            <button 
              onClick={() => { localStorage.removeItem('token'); setToken(''); }}
              className="text-sm bg-red-900/40 hover:bg-red-900 border border-red-700 px-3 py-1 rounded"
            >
              Logout
            </button>
          )}
        </header>
        <main className="p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;