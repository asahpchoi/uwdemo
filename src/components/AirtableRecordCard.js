import React from 'react';
import ReactMarkdown from 'react-markdown';

import ProgressBar from './ProgressBar';
import JsonDisplay from './JsonDisplay';

const AirtableRecordCard = ({ record, variant = 'detail', getDecision, isDecisionLoading }) => {
  if (!record) return null;
  const fields = record.fields || {};

  const renderSummary = () => {
    if (!fields['Summary']) {
      return <ProgressBar />;
    }
    try {
      const summaryJson = JSON.parse(fields['Summary']);
      return <JsonDisplay json={summaryJson} />;
    } catch (error) {
      console.error("Failed to parse Summary JSON:", error);
      return <ReactMarkdown>{fields['Summary']}</ReactMarkdown>;
    }
  };

  const renderDecisionNotes = () => {
    if (!fields['Decision Notes']) {
      return isDecisionLoading ? <ProgressBar /> : null;
    }
    try {
      const decisionJson = JSON.parse(fields['Decision Notes']);
      return <JsonDisplay json={decisionJson} />;
    } catch (error) {
      console.error("Failed to parse Decision Notes JSON:", error);
      return <ReactMarkdown>{fields['Decision Notes']}</ReactMarkdown>;
    }
  };

  return (
    <div className="card">
    
      {variant === 'detail' ? (
        <div className="airtable-record-grid">
          <div className="grid-item">
            <strong>Summary:</strong>
            {renderSummary()}
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
            {renderDecisionNotes()}
          </div>
        </div>
      ) : (
        <ul className="airtable-record">
          <li><strong>Summary:</strong> {renderSummary()}</li>
        </ul>
      )}
    </div>
  );
};

export default AirtableRecordCard;
