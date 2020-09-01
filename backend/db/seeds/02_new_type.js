const Knex = require('knex');

const tableNames = require('../../src/constants/tableNames');

/** 
 * @param {Knex} knex
 */

exports.seed = async (knex) => {
  await Promise.all([
    tableNames.new_type,
  ].map((table) => knex(table).del()));

  await knex(tableNames.new_type).insert({name: 'Articulo'});
  await knex(tableNames.new_type).insert({name: 'Video'});
};