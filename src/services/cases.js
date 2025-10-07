import base, { tableName } from '../api/airtable';

export const fetchCases = () => {
  return new Promise((resolve, reject) => {
    base(tableName).select({
      maxRecords: 10,
      view: 'Grid view'
    }).all((err, records) => {
      if (err) {
        reject(err);
      } else {
        resolve(records);
      }
    });
  });
};

export const findCase = (id) => {
  return new Promise((resolve, reject) => {
    base(tableName).find(id, (err, record) => {
      if (err) {
        reject(err);
      }
      else {
        resolve(record);
      }
    });
  });
};
