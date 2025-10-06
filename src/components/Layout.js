import React from 'react';
import { Link } from 'react-router-dom';

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

const Layout = ({ children, isProduction, toggleEnv }) => (
  <div className="App">
    <Header isProduction={isProduction} toggleEnv={toggleEnv} />
    <main className="container">
      {children}
    </main>
  </div>
);

export default Layout;
