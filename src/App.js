import React, { useState, useEffect } from 'react';
import Airtable from 'airtable';
import ReactMarkdown from 'react-markdown';
import './App.css';

// Configure Airtable
const apiKey = process.env.REACT_APP_AIRTABLE_API_KEY;
const base = new Airtable({ apiKey }).base('app5SLFPvCnsFIsXt');

function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('idle');
  const [airtableRecord, setAirtableRecord] = useState(null);
  const [recordId, setRecordId] = useState(null);
  const [triggerStatus, setTriggerStatus] = useState('idle');
  const [isProduction, setIsProduction] = useState(false);

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

  const fetchAirtableRecord = () => {
    if (!recordId) return;
    base('tblgPTdZZHlLDDpjW').find(recordId, (err, record) => {
      if (err) {
        console.error('Airtable error:', err);
        return;
      }
      setAirtableRecord(record);
    });
  };

  const handleSubmit = async () => {
    if (!selectedImage) return;

    console.log('selectedImage:', selectedImage);

    setUploadStatus('uploading');
    const formData = new FormData();
    formData.append('photo', selectedImage);

    try {
      const url = webhookUrl;
      console.log('url:', url);

      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });

      console.log('response:', response);

      if (response.ok) {
        setUploadStatus('success');
        const data = await response.json();
        if (data.id) {
          setRecordId(data.id);
        }
      } else {
        setUploadStatus('error');
      }
    } catch (error) {
      console.error('An error occurred during the upload:', error);
      setUploadStatus('error');
    }
  };

  const handleTrigger = async () => {
    if (!recordId) return;

    setTriggerStatus('triggering');
    try {
      const url = webhookUrl;
      const response = await fetch(`${url}?recordid=${recordId}`);
      if (response.ok) {
        setTriggerStatus('success');
      } else {
        setTriggerStatus('error');
      }
    } catch (error) {
      setTriggerStatus('error');
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

  const AirtableData = () => {
    const [showReasoning, setShowReasoning] = useState(false);

    useEffect(() => {
      let interval;
      if (uploadStatus === 'success') {
        interval = setInterval(() => {
          fetchAirtableRecord();
        }, 10000);
      }

      if (airtableRecord && airtableRecord.get('Summary')) {
        clearInterval(interval);
      }

      return () => clearInterval(interval);
    });

    return (
      <div className="card">
        <h2>Results</h2>
        <p>Record ID: {recordId}</p>
        <div className="button-group">
          <button onClick={fetchAirtableRecord} className="btn btn-primary">Fetch Data</button>
          {airtableRecord && airtableRecord.get('Summary') && (
            <button onClick={handleTrigger} className="btn btn-primary" disabled={triggerStatus === 'triggering'}>
              {triggerStatus === 'triggering' ? 'Making decision...' : 'Make suggestive decision'}
            </button>
          )}
        </div>
        {triggerStatus === 'success' && <p className="message success-message">Triggered successfully!</p>}
        {triggerStatus === 'error' && <p className="message error-message">Trigger failed. Please try again.</p>}
        {airtableRecord && (
          <div className="airtable-record">
            <ul>
              <li>
                <strong>Summary:</strong> <ReactMarkdown>{airtableRecord.get('Summary')}</ReactMarkdown>
              </li>
              {/* <li>
                <strong>Application Name:</strong> {airtableRecord.get('Application Name')}
              </li> */}
              <li>
                <label className="reasoning-label">
                  <input type="checkbox" checked={showReasoning} onChange={() => setShowReasoning(!showReasoning)} />
                  <strong>Reasoning</strong>
                </label>
                {showReasoning && <div className="reasoning-content">{airtableRecord.get('Reasoning')}</div>}
              </li>
              <li>
                <strong>Decision Notes:</strong> <ReactMarkdown>{airtableRecord.get('Decision Notes')}</ReactMarkdown>
              </li>
              {/* <li>
                <strong>Decision Date:</strong> {airtableRecord.get('Decision Date')}
              </li> */}
            </ul>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Underwriting Demo</h1>
        <div className="env-toggle">
          <label>
            <input type="checkbox" checked={isProduction} onChange={() => setIsProduction(!isProduction)} />
            Use Production URL
          </label>
        </div>
      </header>
      <main className="container">
        <ImageUploader />
        {uploadStatus === 'success' && <AirtableData />}
      </main>
    </div>
  );
}

export default App;