import React from 'react';

const JsonDisplay = ({ json }) => {
  const renderValue = (value) => {
    if (typeof value === 'object') {
      return <JsonDisplay json={value} />;
    }
    return <span>{String(value)}</span>;
  };

  if (Array.isArray(json)) {
    return (
      <div>
        <ul className="list-group list-group-flush">
          {json.map((item, index) => (
            <li key={index} className="list-group-item">{renderValue(item)}</li>
          ))}
        </ul>
      </div>
    );
  }

  if (typeof json === 'object' && json !== null) {
    return (
      <div>
        <ul className="list-group list-group-flush">
          {Object.entries(json).map(([key, value]) => (
            <li key={key} className="list-group-item">
              <span className="fw-bold">{key}:</span> {renderValue(value)}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return renderValue(json);
};

export default JsonDisplay;
