const db = require('../../db');

const tableNames = require('../../constants/tableNames');
const fields = ['id', 'name', 'acronym', 'logo_url'];

module.exports = {
  find() {
    return db(tableNames.team).select(fields);
  },
  async get(id) {
    if(isNaN(id)){
      return db(tableNames.team)
      .select(fields)
      .where({
        acronym: id.toUpperCase(),
      });
    } else {
    return db(tableNames.team)
      .select(fields)
      .where({
        id,
      }).first();
    }
  }
};
