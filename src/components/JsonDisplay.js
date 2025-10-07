import React from 'react';
import './JsonDisplay.css';

const JsonDisplay = ({ json }) => {
  const renderValue = (value) => {
    if (typeof value === 'string') {
      return <span className="json-string">"{value}"</span>;
    }
    if (typeof value === 'number') {
      return <span className="json-number">{value}</span>;
    }
    if (typeof value === 'boolean') {
      return <span className="json-boolean">{String(value)}</span>;
    }
    if (value === null) {
      return <span className="json-null">null</span>;
    }
    if (typeof value === 'object') {
      return <JsonDisplay json={value} />;
    }
    return <span>{String(value)}</span>;
  };

  if (Array.isArray(json)) {
    return (
      <div className="json-display">
        <ul>
          {json.map((item, index) => (
            <li key={index}>
              {renderValue(item)}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (typeof json === 'object' && json !== null) {
    return (
      <div className="json-display">
        <ul>
          {Object.entries(json).map(([key, value]) => (
            <li key={key}>
              <span className="json-key">{key}:</span> {renderValue(value)}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return renderValue(json);
};

export default JsonDisplay;
