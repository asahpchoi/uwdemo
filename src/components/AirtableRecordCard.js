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
    if (!fields['Decision']) {
      return isDecisionLoading ? <ProgressBar /> : null;
    }
    try {
      const decisionJson = JSON.parse(fields['Decision']);
      return <JsonDisplay json={decisionJson} />;
    } catch (error) {
      console.error("Failed to parse Decision Notes JSON:", error);
      return <ReactMarkdown>{fields['Decision Notes']}</ReactMarkdown>;
    }
  };

  return (
    <div className="airtable-record-grid">
      <div className="grid-item card">
        <strong>Summary:</strong>
        {renderSummary()}
      </div>
      {fields['Summary'] && <div className="grid-item card">
        <strong>Decision Notes:</strong>
                {getDecision && !fields['Decision'] && (
          <button onClick={getDecision} className="btn btn-primary">
            Get Decision
          </button>
        )}
        {renderDecisionNotes()}
      </div>}
    </div>
  );
};

export default AirtableRecordCard;
