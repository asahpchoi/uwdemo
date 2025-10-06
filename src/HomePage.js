import React, { useState } from 'react';
/* eslint-disable-next-line no-unused-vars */
import base, { tableName } from './airtable';
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

      // Verify that recordId exists in the response
      if (!data.id) {
        console.error('No recordId found in response');
        setUploadStatus('error');
        return;
      }

      setRecordId(data.id);

      // Fetch the Airtable record using the returned recordId
      base(tableName).find(data.id, (err, record) => {
        if (err) {
          console.error('Error fetching Airtable record:', err);
          setUploadStatus('error');
          return;
        }
        setAirtableRecord(record);
        setUploadStatus('success');
      });
    } catch (e) {
      console.error('Upload failed:', e);
      setUploadStatus('error');
    }
  };

  const handleRefresh = () => {
    if (airtableRecord && airtableRecord.id) {
      base(tableName).find(airtableRecord.id, (err, record) => {
        if (err) {
          console.error('Refresh failed:', err);
          return;
        }
        setAirtableRecord(record);
      });
    } else {
      console.warn('No record available to refresh');
    }
  };

  const getDecision = async () => {
    if (!airtableRecord || !airtableRecord.id) {
      console.error('No record available to get decision for.');
      return;
    }

    const recordId = airtableRecord.id;
    const decisionWebhookUrl = isProduction
      ? `https://demo.asachoi.com/webhook/aa5e0815-ad96-4fce-92b2-f4d4a5e3569d?recordid=${recordId}`
      : `https://demo.asachoi.com/webhook-test/aa5e0815-ad96-4fce-92b2-f4d4a5e3569d?recordid=${recordId}`;

    try {
      const response = await fetch(decisionWebhookUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      console.log('Decision request successful');
      // Optionally, refresh the record to show updated data
      handleRefresh();
    } catch (error) {
      console.error('Failed to get decision:', error);
    }
  };

  return (
    <div className="home-page">
      <ImageUploader
        selectedImage={selectedImage}
        imagePreview={imagePreview}
        uploadStatus={uploadStatus}
        handleImageChange={handleImageChange}
        setSelectedImage={setSelectedImage}
        setImagePreview={setImagePreview}
        handleSubmit={handleSubmit}
      />
      <div>
        {airtableRecord ? (
          <>
            <AirtableRecordCard record={airtableRecord} variant="detail" />
            {airtableRecord.fields['Summary'] && (
              <button onClick={getDecision} className="btn btn-primary">
                Get Decision
              </button>
            )}
          </>
        ) : (
          <div>No record loaded</div>
        )}
        <AirtableRefreshButton onRefresh={handleRefresh} />
      </div>
    </div>
  );
}

export default HomePage;
