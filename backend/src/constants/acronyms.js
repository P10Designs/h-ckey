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
      'acronimos.csv',
    ),
    'utf8',
);

const acronyms = Papa.parse(csvData, {
  header: true,
});


module.exports = acronyms
  .data
  .map(({name}) => ({
    name,
  }));