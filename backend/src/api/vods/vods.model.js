const { Model } = require('objection');

const tableNames = require('../../constants/tableNames');
const schema = require('./vods.schema.json');
const Team = require('../teams/teams.model');
const League = require('../leagues/leagues.model');
const User = require('../users/users.model');

class Vod extends Model {
  static get tableName(){
    return  tableNames.vods;
  }

  static get jsonSchema(){
    return schema;
  }

  static get relationMappings(){
    return {
      local :{
        relation: Model.HasOneRelation,
        modelClass: Team,
        join: {
          from: `${tableNames.vods}.local_id`,
          to: `${tableNames.team}.id`,
        },
      },
      visitor :{
        relation: Model.HasOneRelation,
        modelClass: Team,
        join: {
          from: `${tableNames.vods}.visitor_id`,
          to: `${tableNames.team}.id`,
        },
      },
      league: {
        relation: Model.HasOneRelation,
        modelClass: League,
        join: {
          from: `${tableNames.vods}.league_id` ,
          to: `${tableNames.league}.id`,
        },
      },
    }
  }
}

module.exports = Vod;