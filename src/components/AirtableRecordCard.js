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
    <div>
      <div className="container-fluid">
        <div className="mb-4">
          <h2 className="h4 border-bottom pb-2 mb-3">Summary</h2>
          {renderSummary()}
        </div>
        <div className="mb-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 className="h4 border-bottom pb-2">Decision Notes</h2>
            {getDecision && (
              <button onClick={getDecision} className="btn btn-primary btn-sm">
                Get Decision
              </button>
            )}
          </div>
          {renderDecisionNotes()}
        </div>
      </div>
    </div>
  );
};

export default AirtableRecordCard;
