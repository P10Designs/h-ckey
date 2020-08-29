const bcrypt = require('bcrypt');
const Knex = require('knex');

const tableNames = require('../../src/constants/tableNames');

/** 
 * @param {Knex} knex
 */

exports.seed = async (knex) => {
  await Promise.all([
    tableNames.user,
  ].map((table) => knex(table).del()));

  const password = 'Santacatalina101';
  const user = {
    name: 'Pedro', 
    surname: 'Soba', 
    username: 'P10Designs',
    email: 'designs.p10@gmail.com',
    password: await bcrypt.hash(password, 12),
  }
  await knex(tableNames.user).insert(user).returning('*');
};