const { Model } = require('objection');

const tableNames = require('../../constants/tableNames');
const schema =  require('./vods.schema.json');

class Vods extends Model {
  static get tableName() {
    return tableNames.vods;
  }
  static get jsonSchema(){
    return schema;
  }
}
module.exports = Vods ;