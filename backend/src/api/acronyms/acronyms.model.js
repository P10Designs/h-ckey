const { Model } = require('objection');

const tableNames = require('../../constants/tableNames');
const schema = require('./acronyms.schema.json');

class Acronym extends Model {
  static get tableName() {
    return tableNames.acronym;
  }

  static get jsonSchema(){
    return schema;
  }
}

module.exports = Acronym;