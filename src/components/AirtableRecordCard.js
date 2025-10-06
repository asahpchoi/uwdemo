import React from 'react';
import ReactMarkdown from 'react-markdown';

const AirtableRecordCard = ({ record, variant = 'detail', getDecision, isDecisionLoading }) => {
  if (!record) return null;
  const fields = record.fields || {};
  return (
    <div className="card">
      <h1>{fields['Policy No'] || record.id}</h1>
      {variant === 'detail' ? (
        <div className="airtable-record-grid">
          <div className="grid-item">
            <strong>Summary:</strong>
            {fields['Summary'] ? (
              <ReactMarkdown>{fields['Summary']}</ReactMarkdown>
            ) : (
              <div className="spinner"></div>
            )}
          </div>
          <div className="grid-item">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <strong>Decision Notes:</strong>
              {getDecision && (
                <button onClick={getDecision} className="btn btn-primary">
                  Get Decision
                </button>
              )}
            </div>
            <ReactMarkdown>{fields['Decision Notes']}</ReactMarkdown>
            {isDecisionLoading && !fields['Decision Notes'] && <div className="spinner"></div>}
          </div>
        </div>
      ) : (
        <ul className="airtable-record">
          <li><strong>Summary:</strong> <ReactMarkdown>{fields['Summary']}</ReactMarkdown></li>
        </ul>
      )}
    </div>
  );
};

export default AirtableRecordCard;
