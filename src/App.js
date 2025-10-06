import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import HomePage from './HomePage';
import CaseListPage from './CaseListPage';
import CaseDetailPage from './CaseDetailPage';
import './App.css';

function App() {
  const [isProduction, setIsProduction] = useState(false);

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          <Link to="/">Underwriting Demo</Link>
          <Link to="/cases">Case List</Link>
        </h1>
        <div className="env-toggle">
          <label>
            <input
              type="checkbox"
              checked={isProduction}
              onChange={() => setIsProduction(!isProduction)}
            />
            Use Production URL
          </label>
        </div>
      </header>
      <main className="container">
        <Routes>
          <Route
            path="/"
            element={<HomePage isProduction={isProduction} />} // Pass isProduction to HomePage
          />
          <Route path="/cases" element={<CaseListPage />} />
          <Route path="/case/:id" element={<CaseDetailPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
