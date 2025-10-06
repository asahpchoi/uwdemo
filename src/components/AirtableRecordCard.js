import React from 'react';
import ReactMarkdown from 'react-markdown';

const AirtableRecordCard = ({ record, variant = 'detail' }) => {
  if (!record) return null;
  const fields = record.fields || {};
  return (
    <div className="card">
      <h1>{fields['Policy No'] || record.id}</h1>
      {variant === 'detail' ? (
        <ul className="airtable-record">
          <li><strong>Summary:</strong> <ReactMarkdown>{fields['Summary']}</ReactMarkdown></li>
          <li><strong>Reasoning:</strong> <ReactMarkdown>{fields['Reasoning']}</ReactMarkdown></li>
          <li><strong>Decision Notes:</strong> <ReactMarkdown>{fields['Decision Notes']}</ReactMarkdown></li>
        </ul>
      ) : (
        <ul className="airtable-record">
          <li><strong>Summary:</strong> <ReactMarkdown>{fields['Summary']}</ReactMarkdown></li>
        </ul>
      )}
    </div>
  );
};

export default AirtableRecordCard;
