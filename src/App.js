import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import HomePage from './HomePage';
import CaseListPage from './CaseListPage';
import CaseDetailPage from './CaseDetailPage';
import './App.css';

const Header = ({ isProduction, toggleEnv }) => (
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
          onChange={toggleEnv}
        />
        Use Production URL
      </label>
    </div>
  </header>
);

function App() {
  const [isProduction, setIsProduction] = useState(false);
  const toggleEnv = () => setIsProduction(prev => !prev);

  return (
    <div className="App">
      <Header isProduction={isProduction} toggleEnv={toggleEnv} />
      <main className="container">
        <Routes>
          <Route
            path="/"
            element={<HomePage isProduction={isProduction} />}
          />
          <Route path="/cases" element={<CaseListPage />} />
          <Route path="/case/:id" element={<CaseDetailPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
