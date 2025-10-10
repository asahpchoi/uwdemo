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
  <div className="card p-4">
    <h2 className="text-center">Upload a document to start</h2>
    <div className="d-flex flex-column align-items-center">
      <input
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleImageChange}
        id="file-input"
        className="d-none"
      />
      <label htmlFor="file-input" className="btn btn-primary">
        {selectedImage ? 'Change file' : 'Choose a file or take a picture'}
      </label>
      {imagePreview && <img src={imagePreview} alt="Preview" className="img-thumbnail mt-3" />}
    </div>
    {selectedImage && (
      <div className="d-grid gap-2 mt-3">
        <button onClick={handleSubmit} className="btn btn-primary" disabled={uploadStatus === 'uploading'}>
          {uploadStatus === 'uploading' ? 'Uploading...' : 'Extract and Summerize'}
        </button>
      </div>
    )}
    {uploadStatus === 'success' && <div className="alert alert-success mt-3" role="alert">Photo uploaded successfully!</div>}
    {uploadStatus === 'error' && <div className="alert alert-danger mt-3" role="alert">Upload failed. Please try again.</div>}
  </div>
);

export default ImageUploader;
