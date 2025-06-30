import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import GamePage from '@/components/pages/GamePage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-background to-surface">
        <Routes>
          <Route path="/" element={<GamePage />} />
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>
    </Router>
  );
}

export default App;