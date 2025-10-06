import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AirtableRecordCard from './components/AirtableRecordCard';
import base, { tableName } from './airtable';

const CaseDetailPage = () => {
  const { id } = useParams();
  const [caseItem, setCaseItem] = useState(null);

  useEffect(() => {
    base(tableName).find(id, function(err, record) {
      if (err) { console.error(err); return; }
      setCaseItem(record);
    });
  }, [id]);

  if (!caseItem) {
    return <div>Loading...</div>;
  }

  return (
    <AirtableRecordCard record={caseItem} variant="detail" />
  );
};

export default CaseDetailPage;