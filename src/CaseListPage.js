import React from 'react';
import { Link } from 'react-router-dom';
import { fetchCases } from './services/cases';
import useAirtable from './hooks/useAirtable';

const CaseListPage = ({ isProduction }) => {
  const { data: cases, isLoading } = useAirtable(fetchCases);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="card p-3">
      <h1>Case List</h1>
      <table className="table table-striped table-hover">
        <thead className="thead-dark">
          <tr>
            <th>Policy No</th>
            <th>Summary</th>
          </tr>
        </thead>
        <tbody>
          {cases && cases.map(c => (
            <tr key={c.id}>
              <td><Link to={`/case/${c.id}`}>{c.fields['PolicyNo'] || c.id}</Link></td>
              <td>
                {c.fields['Summary'] && (() => {
                  try {
                    const summary = JSON.parse(c.fields['Summary']);
                    return summary.PolicyInformation.ProductPurchased;
                  } catch (e) {
                    return c.fields['Summary'].substring(0, 100) + '...';
                  }
                })()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CaseListPage;