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
      console.error("Failed to parse Suggestive Decision JSON:", error);
      return <ReactMarkdown>{fields['Decision']}</ReactMarkdown>;
    }
  };

  return (
    <div className="d-flex flex-column">
      <div className="card p-4 mb-3 shadow-sm border">
        <strong>Summary:</strong>
        {renderSummary()}
      </div>
      {fields['Summary'] && (
        <div className="card p-4 shadow-sm border">
          <strong>Suggestive Decision:</strong>
          {getDecision && !fields['Decision'] && (
            <button onClick={getDecision} className="btn btn-primary">
              Get Decision
            </button>
          )}
          {renderDecisionNotes()}
        </div>
      )}
    </div>
  );
};

export default AirtableRecordCard;
