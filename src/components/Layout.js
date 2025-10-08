import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ isProduction, toggleEnv }) => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container-fluid">
      <Link className="navbar-brand" to="/">Underwriting Demo</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className="nav-link" to="/cases">Case List</Link>
          </li>
        </ul>
        <div className="form-check form-switch text-light">
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckDefault"
            checked={isProduction}
            onChange={toggleEnv}
          />
          <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Use Production URL</label>
        </div>
      </div>
    </div>
  </nav>
);

const Layout = ({ children, isProduction, toggleEnv }) => (
  <div>
    <Header isProduction={isProduction} toggleEnv={toggleEnv} />
    <div className="container mt-4">
      {children}
    </div>
  </div>
);

export default Layout;
