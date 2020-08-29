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
      'teams.csv',
    ),
    'utf8',
);

const teams = Papa.parse(csvData, {
  header: true,
});


module.exports = teams
  .data
  .map(({name, acronym}) => ({
    name,
    acronym,
  }));