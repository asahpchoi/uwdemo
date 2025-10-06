import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import CaseListPage from './CaseListPage';
import CaseDetailPage from './CaseDetailPage';
import Layout from './components/Layout';
import './App.css';

function App() {
  const [isProduction, setIsProduction] = useState(false);
  const toggleEnv = () => setIsProduction(prev => !prev);

  return (
    <Layout isProduction={isProduction} toggleEnv={toggleEnv}>
      <Routes>
        <Route
          path="/"
          element={<HomePage isProduction={isProduction} />}
        />
        <Route path="/cases" element={<CaseListPage />} />
        <Route path="/case/:id" element={<CaseDetailPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
