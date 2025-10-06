import React from 'react';

const ImageUploader = ({
  selectedImage,
  imagePreview,
  uploadStatus,
  handleImageChange,
  setSelectedImage,
  setImagePreview,
  handleSubmit,
}) => (
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

export default ImageUploader;
