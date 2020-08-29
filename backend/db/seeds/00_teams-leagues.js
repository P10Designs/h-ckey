// TODO: Finish seed for new tables
const Knex = require('knex');

const tableNames = require('../../src/constants/tableNames');
const teams = require('../../src/constants/teams');
const league = require('../../src/constants/leagues');


/** 
 * @param {Knex} knex
 */

exports.seed = async (knex) => {
  await Promise.all([
    tableNames.team,
    tableNames.league,
  ].map((table) => knex(table).del()));

  await knex(tableNames.team).insert(teams, '*');
  await knex(tableNames.league).insert(league, '*');
};