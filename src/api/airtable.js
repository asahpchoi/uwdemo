import Airtable from 'airtable';

const apiKey = process.env.REACT_APP_AIRTABLE_API_KEY;
const base = new Airtable({ apiKey }).base('app5SLFPvCnsFIsXt');

export const tableName = 'tblgPTdZZHlLDDpjW';

export default base;
