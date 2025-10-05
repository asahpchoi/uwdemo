import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import HomePage from './HomePage';
import CaseListPage from './CaseListPage';
import CaseDetailPage from './CaseDetailPage';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Underwriting Demo</h1>
        <nav>
          <ul className="nav-links">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/cases">Case List</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cases" element={<CaseListPage />} />
          <Route path="/case/:id" element={<CaseDetailPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
