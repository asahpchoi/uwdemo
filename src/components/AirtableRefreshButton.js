import React from 'react';

const AirtableRefreshButton = ({ onRefresh }) => (
  <button onClick={onRefresh} style={{ padding: '8px 16px', margin: '8px 0', cursor: 'pointer' }}>
    Refresh
  </button>
);

export default AirtableRefreshButton;
