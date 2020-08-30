const { Model } = require('objection');

const tableNames = require('../../constants/tableNames');
const schema = require('./logos.schema.json');

class Logo extends Model {
  static get tableName() {
    return tableNames.logo;
  }

  static get jsonSchema(){
    return schema;
  }
}

module.exports = Logo;