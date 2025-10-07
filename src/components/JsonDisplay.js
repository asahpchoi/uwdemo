import React from 'react';

const JsonDisplay = ({ json }) => {
  if (typeof json !== 'object' || json === null) {
    return <span>{String(json)}</span>;
  }

  if (Array.isArray(json)) {
    return (
      <ul style={{ listStyleType: 'none', paddingLeft: '20px' }}>
        {json.map((item, index) => (
          <li key={index}>
            <JsonDisplay json={item} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul style={{ listStyleType: 'none', paddingLeft: '20px' }}>
      {Object.entries(json).map(([key, value]) => (
        <li key={key}>
          <strong>{key}:</strong> 
          {typeof value === 'object' && value !== null ? 
            <JsonDisplay json={value} /> :
            <span> {String(value)}</span>
          }
        </li>
      ))}
    </ul>
  );
};

export default JsonDisplay;
