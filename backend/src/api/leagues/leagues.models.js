const { Model } = require('objection');

const tableNames = require('../../constants/tableNames');
const schema = require('./leagues.schema.json');

class Leagues extends Model {
  static get tableName() {
    return tableNames.league;
  }

  static get jsonSchema(){
    return schema;
  }
}

module.exports = Leagues;