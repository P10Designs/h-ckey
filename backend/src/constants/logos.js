const fs = require('fs');
const path = require('path');
const Papa = require('papaparse');


const csvData =  fs
  .readFileSync(
    path.join(
      __dirname,
      '..',
      '..',
      'db',
      'sources',
      'logos.csv',
    ),
    'utf8',
);

const logo_url = Papa.parse(csvData, {
  header: true,
});


module.exports = logo_url
  .data
  .map(({logo_url}) => ({
    logo_url,
  }));