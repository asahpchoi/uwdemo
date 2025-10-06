import React, { useState, useEffect } from 'react';
import base from './airtable';
import ReactMarkdown from 'react-markdown';
import './App.css';
import AirtableRecordCard from './components/AirtableRecordCard';

function HomePage({ isProduction }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('idle');
  const [airtableRecord, setAirtableRecord] = useState(null);
  const [recordId, setRecordId] = useState(null);
  const [triggerStatus, setTriggerStatus] = useState('idle');
  

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

  return (
    <div className="home-page">
      <ImageUploader />
      {uploadStatus === 'success' && airtableRecord && <AirtableRecordCard record={airtableRecord} variant="detail" />}
    </div>
  );
}

export default HomePage;
