// TODO: Re do migrations

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
    table.string('acronym', 5).notNullable();
    url(table, 'logo')// TODO: Get all logos and make this function nullable
    addDefaultColumns(table);
  });

  await knex.schema.createTable(tableNames.league, (table) => {
    table.increments().notNullable();
    name(table).notNullable().unique();
    addDefaultColumns(table);
  });


  await knex.schema.createTable(tableNames.vods, (table) => {
    table.increments().notNullable();
    references(table, tableNames.team, true, 'local');
    table.integer('local_result').notNullable();
    references(table, tableNames.team, true, 'visitor');
    references(table, tableNames.league, true);
    references(table, tableNames.user, true);
    table.integer('visitor_result').notNullable();
    table.string('video_url').notNullable();
    addDefaultColumns(table);
  });

  // TODO: Update the database, changes had been made

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

  await knex.schema.createTable(tableNames.new, (table) => {
    table.increments().notNullable();
    name(name).notNullable();
    references(table, tableNames.league, true);
    table.string('image_url').notNullable();
    references(table,tableNames.user, true);
    addDefaultColumns(table);
  });
};

exports.down = async (knex) => {
  await Promise.all([
    tableNames.new,
    tableNames.match,
    tableNames.new_type,
    tableNames.vods,
    tableNames.league,
    tableNames.team,
    tableNames.user,
  ].map((tableName) => knex.schema.dropTableIfExists(tableName)));
};