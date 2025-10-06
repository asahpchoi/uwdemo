import Airtable from 'airtable';
import React from 'react';

const apiKey = process.env.REACT_APP_AIRTABLE_API_KEY;
const base = new Airtable({ apiKey }).base('app5SLFPvCnsFIsXt');

export default base;

// Export a refresh button component for Airtable actions
export function AirtableRefreshButton({ onRefresh }) {
  return (
    <button onClick={onRefresh} style={{ padding: '8px 16px', margin: '8px 0', cursor: 'pointer' }}>
      Refresh
    </button>
  );
}
