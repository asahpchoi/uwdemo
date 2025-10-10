import React, { useState, useEffect, useRef } from 'react';

import { findCase } from './services/cases';
import AirtableRefreshButton from './components/AirtableRefreshButton';
import './App.css';
import AirtableRecordCard from './components/AirtableRecordCard';
import ImageUploader from './components/ImageUploader';

function HomePage({ isProduction }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('idle');
  const [airtableRecord, setAirtableRecord] = useState(null);
  const [recordId, setRecordId] = useState(null); // eslint-disable-line no-unused-vars
  const [isPolling, setIsPolling] = useState(false);
  const [isDecisionLoading, setIsDecisionLoading] = useState(false);
  const pollingRef = useRef(null);

  useEffect(() => {
    if (airtableRecord && airtableRecord.id && !airtableRecord.fields['Decision']) {
      setIsPolling(true);
      pollingRef.current = setInterval(() => {
        handleRefresh();
      }, 10000);
    } else {
      setIsPolling(false);
      clearInterval(pollingRef.current);
    }

    return () => {
      clearInterval(pollingRef.current);
    };
  }, [airtableRecord]);
  

  const webhookUrl = isProduction
    ? process.env.REACT_APP_PRODUCTION_URL
    : process.env.REACT_APP_TESTING_URL;

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
      setUploadStatus('idle');
      setAirtableRecord(null);
    }
  };

  /* Update handleSubmit to check response status and handle empty responses more robustly */

  const handleSubmit = async () => {
    if (!selectedImage) return;

    setUploadStatus('uploading');
    const formData = new FormData();
    formData.append('file', selectedImage);

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        console.error(`HTTP error! status: ${response.status} - ${response.statusText}`);
        setUploadStatus('error');
        return;
      }

      // Attempt to read response as text
      const text = await response.text();

      if (!text) {
        console.warn('Empty response received');
        setUploadStatus('error');
        return;
      }

      let data = {};
      try {
        data = JSON.parse(text);
      } catch (jsonError) {
        console.error('JSON parse error:', jsonError);
        setUploadStatus('error');
        return;
      }

      console.log({data})

      const recordData = data.data || data;

      // Verify that recordId exists in the response
      if (!recordData.id) {
        console.error('No recordId found in response');
        setUploadStatus('error');
        return;
      }

      const recordId = recordData.id;
      setRecordId(recordId);

      // Fetch the Airtable record using the returned recordId
      findCase(recordId)
        .then(record => {
          setAirtableRecord(record);
          setUploadStatus('success');
        })
        .catch(err => {
          console.error('Error fetching Airtable record:', err);
          setUploadStatus('error');
        });
    } catch (e) {
      console.error('Upload failed:', e);
      setUploadStatus('error');
    }
  };

  const handleRefresh = () => {
    if (airtableRecord && airtableRecord.id) {
      return findCase(airtableRecord.id)
        .then(record => {
          setAirtableRecord(record);
        })
        .catch(err => {
          console.error('Refresh failed:', err);
        });
    } else {
      console.warn('No record available to refresh');
      return Promise.resolve();
    }
  };

  const getDecision = async () => {
    if (!airtableRecord || !airtableRecord.id) {
      console.error('No record available to get decision for.');
      return;
    }

    setIsDecisionLoading(true);

    const recordId = airtableRecord.id;
    const decisionWebhookUrl = isProduction
      ? `${process.env.REACT_APP_DECISION_WEBHOOK_URL_PRODUCTION}?recordid=${recordId}`
      : `${process.env.REACT_APP_DECISION_WEBHOOK_URL_DEVELOPMENT}?recordid=${recordId}`;

    console.log('Decision Request URL:', decisionWebhookUrl);

    try {
      const response = await fetch(decisionWebhookUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      console.log('Decision request successful');
      // Optionally, refresh the record to show updated data
      await handleRefresh();
    } catch (error) {
      console.error('Failed to get decision:', error);
    } finally {
      //setIsDecisionLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className={airtableRecord ? "col-md-4" : "col-md-8"}>
          <ImageUploader
            selectedImage={selectedImage}
            imagePreview={imagePreview}
            uploadStatus={uploadStatus}
            handleImageChange={handleImageChange}
            setSelectedImage={setSelectedImage}
            setImagePreview={setImagePreview}
            handleSubmit={handleSubmit}
            summaryFilled={!!airtableRecord}
          />
        </div>
   
        <div className={airtableRecord ? "col-md-8" : "col-md-4"}>
          {airtableRecord ? (
            <AirtableRecordCard record={airtableRecord} variant="detail" getDecision={getDecision} isDecisionLoading={isDecisionLoading} />
          ) : (
            <div className="card p-3">No record loaded</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
