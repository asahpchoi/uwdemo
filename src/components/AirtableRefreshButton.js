import React from 'react';

const AirtableRefreshButton = ({ onRefresh }) => (
  <button onClick={onRefresh} className="btn btn-secondary">
    Refresh
  </button>
);

export default AirtableRefreshButton;
