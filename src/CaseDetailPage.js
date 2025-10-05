import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Airtable from 'airtable';
import ReactMarkdown from 'react-markdown';

const apiKey = process.env.REACT_APP_AIRTABLE_API_KEY;
const base = new Airtable({ apiKey }).base('app5SLFPvCnsFIsXt');

const CaseDetailPage = () => {
  const { id } = useParams();
  const [caseItem, setCaseItem] = useState(null);

  useEffect(() => {
    base('tblgPTdZZHlLDDpjW').find(id, function(err, record) {
      if (err) { console.error(err); return; }
      setCaseItem(record);
    });
  }, [id]);

  if (!caseItem) {
    return <div>Loading...</div>;
  }

  return (
    <div className="card">
      <h1>{caseItem.fields['Policy No'] || caseItem.id}</h1>
      <ul className="airtable-record">
        <li>
          <strong>Summary:</strong> <ReactMarkdown>{caseItem.fields['Summary']}</ReactMarkdown>
        </li>
        <li>
          <strong>Reasoning:</strong> <ReactMarkdown>{caseItem.fields['Reasoning']}</ReactMarkdown>
        </li>
        <li>
          <strong>Decision Notes:</strong> <ReactMarkdown>{caseItem.fields['Decision Notes']}</ReactMarkdown>
        </li>
      </ul>
    </div>
  );
};

export default CaseDetailPage;