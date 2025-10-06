import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import base, { tableName } from './airtable';

const CaseListPage = () => {
  const [cases, setCases] = useState([]);

  useEffect(() => {
    base(tableName).select({
      // Selecting the first 10 records in Grid view:
      maxRecords: 10,
      view: 'Grid view'
    }).eachPage(function page(records, fetchNextPage) {
      // This function (`page`) will get called for each page of records.
      if (records.length > 0) {
        console.log(records[0].fields);
      }
      setCases(records);
      // To fetch the next page of records, call `fetchNextPage`.
      // If there are more records, `page` will get called again.
      // If there are no more records, `done` will get called.
      fetchNextPage();
    }, function done(err) {
      if (err) { console.error(err); return; }
    });
  }, []);

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

export default CaseListPage;