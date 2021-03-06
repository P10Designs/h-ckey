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
      'leagues.csv',
    ),
    'utf8',
);

const league = Papa.parse(csvData, {
  header: true,
});


module.exports = league
  .data
  .map(({name, logo_id}) => ({
    name,
    logo_id,
  }));