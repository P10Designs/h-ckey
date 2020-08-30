const Knex = require('knex');

const tableNames = require('../../src/constants/tableNames');
const {
  email,
  url,
  references,
  addDefaultColumns,
  name,
} = require('../utils/tableUtils');
/** table.string
 * @param {Knex} knex 
 */

exports.up = async (knex) => {
  await knex.schema.createTable(tableNames.user, (table) => {
    table.increments().notNullable();
    table.string('username').notNullable().unique();
    name(table).notNullable();
    table.string('surname').notNullable();
    email(table).notNullable().unique();
    table.string('password', 127).notNullable();
    table.dateTime('last_login');
    addDefaultColumns(table);
  });

  await knex.schema.createTable(tableNames.acronym ,(table) => {
    table.increments().notNullable();
    name(table).notNullable().unique();
    addDefaultColumns();
  });

  await knex.schema.createTable(tableNames.logo, (table) => {
    table.increments().notNullable();
    url(table, 'logo').notNullable().unique();
    addDefaultColumns(table);
  });
  
  await knex.schema.createTable(tableNames.new_type, (table) => {
    table.increments().notNullable();
    name(table).notNullable().unique();
    addDefaultColumns(table);
  });
  
  await knex.schema.createTable(tableNames.team, (table) =>{
    table.increments().notNullable();
    name(table).notNullable().unique();
    references(table, tableNames.acronym, true);
    references(table, tableNames.logo, true);
    addDefaultColumns(table);
  });

  await knex.schema.createTable(tableNames.league, (table) => {
    table.increments().notNullable();
    name(table).notNullable().unique();
    references(table, tableNames.logo, true);
    addDefaultColumns(table);
  });

  await knex.schema.createTable(tableNames.new, (table) => {
    table.increments().notNullable();
    name(name).notNullable();
    url(table, 'image').notNullable();
    references(table, tableNames.new_type, true);
    references(table, tableNames.league, true);
    references(table,tableNames.user, true);
    addDefaultColumns(table);
  });

  await knex.schema.createTable(tableNames.vods, (table) => {
    table.increments().notNullable();
    references(table, tableNames.team, true, 'local');
    references(table, tableNames.team, true, 'visitor');
    table.integer('local_result').notNullable();
    table.integer('visitor_result').notNullable();
    references(table, tableNames.league, true);
    references(table, tableNames.user, true);
    url(table, 'video').notNullable();
    addDefaultColumns(table);
  });

  await knex.schema.createTable(tableNames.match, (table) => {
    table.increments().notNullable();
    references(table, tableNames.team, true, 'local');
    references(table, tableNames.team, true, 'visitor');
    references(table, tableNames.league, true);
    table.boolean('played').notNullable();
    table.timestamp('match_time', {useTz: true}).notNullable();
    references(table, tableNames.user, true);
    references(table, tableNames.vods, false);
    addDefaultColumns(table);
  });

 
};

exports.down = async (knex) => {
  await Promise.all([
    tableNames.match,
    tableNames.vods,
    tableNames.new,
    tableNames.league,
    tableNames.team,
    tableNames.new_type,
    tableNames.logo,
    tableNames.acronym,
    tableNames.user,
  ].map((tableName) => knex.schema.dropTableIfExists(tableName)));
};