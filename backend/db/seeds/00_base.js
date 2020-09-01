const Knex = require('knex');

const tableNames = require('../../src/constants/tableNames');
const logo = require('../../src/constants/logos');
const leagues = require('../../src/constants/leagues');
const acronyms = require('../../src/constants/acronyms');
const teams = require('../../src/constants/teams')



/** 
 * @param {Knex} knex
 */

exports.seed = async (knex) => {
  await Promise.all([
    tableNames.logo,
    tableNames.league,
    tableNames.acronym, 
    tableNames.team,
  ].map((table) => knex(table).del()));

  await knex(tableNames.logo).insert(logo, '*');
  await knex(tableNames.league).insert(leagues, '*');
  await knex(tableNames.acronym).insert(acronyms, '*');
  await knex(tableNames.team).insert(teams, '*');

};