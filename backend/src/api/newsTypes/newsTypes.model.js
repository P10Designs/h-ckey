const { Model } = require('objection');

const tableNames = require('../../constants/tableNames');
const schema = require('./newsTypes.schema.json');

class NewType extends Model {
  static get tableName(){
    return tableNames.new_type;
  }

  static get jsonSchema(){
    return schema;
  }
}

module.exports = NewType ;