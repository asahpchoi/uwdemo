import React, { useState } from 'react';
/* eslint-disable-next-line no-unused-vars */
import base, { AirtableRefreshButton } from './airtable';
import './App.css';
import AirtableRecordCard from './components/AirtableRecordCard';

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
      base('tblgPTdZZHlLDDpjW').find(data.id, (err, record) => {
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
      base('tblgPTdZZHlLDDpjW').find(airtableRecord.id, (err, record) => {
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

  const ImageUploader = () => (
    <div className="card">
      <h2>Upload or Take a Photo</h2>
      <div className="image-uploader">
        <input
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleImageChange}
          id="file-input"
        />
        <label htmlFor="file-input" className="file-label">
          {selectedImage ? 'Change file' : 'Choose a file or take a picture'}
        </label>
        {imagePreview && <img src={imagePreview} alt="Preview" className="image-preview" />}
      </div>
      {selectedImage && (
        <div className="button-group">
          <button onClick={() => {setSelectedImage(null); setImagePreview(null);}} className="btn btn-danger">
            Remove
          </button>
          <button onClick={handleSubmit} className="btn btn-success" disabled={uploadStatus === 'uploading'}>
            {uploadStatus === 'uploading' ? 'Uploading...' : 'Submit'}
          </button>
        </div>
      )}
      {uploadStatus === 'success' && <p className="message success-message">Photo uploaded successfully!</p>}
      {uploadStatus === 'error' && <p className="message error-message">Upload failed. Please try again.</p>}
    </div>
  );

  return (
    <div className="home-page">
      <ImageUploader />
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
