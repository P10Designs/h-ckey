const { Model } = require('objection');

const tableNames = require('../../constants/tableNames');
const schema = require('./news.schema.json');
const League = require('../leagues/leagues.model');
const NewType = require('../newsTypes/newsTypes.model');
const User = require('../users/users.model');

class New extends Model{
  static get tableName(){
    return tableNames.new;
  }

  static get jsonSchema(){
    return schema;
  }

  static get relationMappings(){
    return {
      league: {
        relation: Model.HasOneRelation,
        modelClass: League,
        join: {
          from: `${tableNames.new}.league_id`,
          to: `${tableNames.league}.id`,
        },
      },
      type: {
        relation: Model.HasOneRelation,
        modelClass: NewType,
        join: {
          from: `${tableNames.new}.new_type_id`,
          to: `${tableNames.new_type}.id`,
        }
      },
      user: {
        relation: Model.HasOneRelation,
        modelClass: User,
        join: {
          from: `${tableNames.new}.user_id` ,
          to: `${tableNames.user}.id`,
        },
      },
    }
  }
}

module.exports = New