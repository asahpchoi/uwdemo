import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Airtable from 'airtable';
import ReactMarkdown from 'react-markdown';

const apiKey = process.env.REACT_APP_AIRTABLE_API_KEY;
const base = new Airtable({ apiKey }).base('app5SLFPvCnsFIsXt');

const CasePage = () => {
  const { id } = useParams();
  const [caseItem, setCaseItem] = useState(null);
  const [cases, setCases] = useState([]);

  useEffect(() => {
    if (id) {
      base('tblgPTdZZHlLDDpjW').find(id, function(err, record) {
        if (err) { console.error(err); return; }
        setCaseItem(record);
      });
    } else {
      base('tblgPTdZZHlLDDpjW').select({
        maxRecords: 10,
        view: 'Grid view'
      }).eachPage(function page(records, fetchNextPage) {
        if (records.length > 0) {
          console.log(records[0].fields);
        }
        setCases(records);
        fetchNextPage();
      }, function done(err) {
        if (err) { console.error(err); return; }
      });
    }
  }, [id]);

  if (id) {
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
  }

  return (
    <div className="card">
      <h1>Case List</h1>
      <ul className="airtable-record">
        {cases.map(c => (
          <li key={c.id}>
            <Link to={`/case/${c.id}`}>{c.fields['Policy No'] || c.id}</Link>
            <p>{c.fields['Summary'] && c.fields['Summary'].substring(0, 100)}...</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CasePage;
