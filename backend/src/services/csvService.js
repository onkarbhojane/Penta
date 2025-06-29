import { Parser } from 'json2csv';

export const generateCSV = (data, fields) => {
  const parser = new Parser({ fields });
  return parser.parse(data);
};
