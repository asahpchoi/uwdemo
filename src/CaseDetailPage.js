import React, { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import AirtableRecordCard from './components/AirtableRecordCard';
import { findCase } from './services/cases';
import useAirtable from './hooks/useAirtable';

const CaseDetailPage = ({ isProduction }) => {
  const { id } = useParams();
  const fetcher = useCallback(() => findCase(id), [id]);
  const { data: caseItem, isLoading } = useAirtable(fetcher);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h1 className="text-primary">Case Details</h1>
      <AirtableRecordCard record={caseItem} variant="detail" />
    </div>
  );
};

export default CaseDetailPage;