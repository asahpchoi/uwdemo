import React from 'react';
import ReactMarkdown from 'react-markdown';

const AirtableRecordCard = ({ record, variant = 'detail' }) => {
  if (!record) return null;
  const fields = record.fields || {};
  return (
    <div className="card">
      <h1>{fields['Policy No'] || record.id}</h1>
      {variant === 'detail' ? (
        <div className="airtable-record-grid">
          <div className="grid-item">
            <strong>Summary:</strong>
            <ReactMarkdown>{fields['Summary']}</ReactMarkdown>
          </div>
          <div className="grid-item">
            <strong>Reasoning:</strong>
            <ReactMarkdown>{fields['Reasoning']}</ReactMarkdown>
          </div>
          <div className="grid-item">
            <strong>Decision Notes:</strong>
            <ReactMarkdown>{fields['Decision Notes']}</ReactMarkdown>
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
