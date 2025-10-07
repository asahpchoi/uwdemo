import React from 'react';
import { useParams } from 'react-router-dom';
import AirtableRecordCard from './components/AirtableRecordCard';
import { findCase } from './services/cases';
import useAirtable from './hooks/useAirtable';

const CaseDetailPage = () => {
  const { id } = useParams();
  const { data: caseItem, isLoading } = useAirtable(findCase, id);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <AirtableRecordCard record={caseItem} variant="detail" />
  );
};

export default CaseDetailPage;