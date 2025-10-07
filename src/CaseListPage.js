import React from 'react';
import { Link } from 'react-router-dom';
import { fetchCases } from './services/cases';
import useAirtable from './hooks/useAirtable';

const CaseListPage = () => {
  const { data: cases, isLoading } = useAirtable(fetchCases);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="card">
      <h1>Case List</h1>
      <ul className="airtable-record">
        {cases && cases.map(c => (
          <li key={c.id}>
            <Link to={`/case/${c.id}`}>{c.fields['Policy No'] || c.id}</Link>
            <p>{c.fields['Summary'] && c.fields['Summary'].substring(0, 100)}...</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CaseListPage;