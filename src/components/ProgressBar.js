import React from 'react';

const ProgressBar = () => {
  return (
    <div className="progress">
      <div
        className="progress-bar progress-bar-striped progress-bar-animated bg-primary"
        role="progressbar"
        aria-valuenow="100"
        aria-valuemin="0"
        aria-valuemax="100"
        style={{ width: '100%' }}
      ></div>
    </div>
  );
};

export default ProgressBar;
