const { Model } = require('objection');

const tableNames = require('../../constants/tableNames');
const schema = require('./lives.schema.json');
const Match = require('../matches/matches.model');

class Live extends Model{
  static get tableName(){
    return tableNames.live;
  }

  static get jsonSchema(){
    return schema
  }

  static get relationMappings(){
    return{
      match: {
        relation: Model.HasOneRelation,
        modelClass: Match,
        join: {
          from: `${tableNames.live}.match_id`,
          to: `${tableNames.match}.id`
        }
      },
    }
  }
};

module.exports = Live;