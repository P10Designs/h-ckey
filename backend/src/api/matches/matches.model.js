const { Model } = require('objection');

const tableNames = require('../../constants/tableNames');
const schema = require('./matches.schema.json');
const Team = require('../teams/teams.model');
const League = require('../leagues/leagues.model');
const User = require('../users/users.model');
const Vod = require('../vods/vods.model');

class Match extends Model {
  static get tableName(){
    return tableNames.match;
  }

  static get jsonSchema(){
    return schema;
  }

  static get relationMappings(){
    return {
      local: {
        relation: Model.HasOneRelation,
        modelClass: Team,
        join:{
          from: `${tableNames.match}.local_id`,
          to:`${tableNames.team}.id`,
        },
      },
      visitor: {
        relation: Model.HasOneRelation,
        modelClass: Team,
        join:{
          from: `${tableNames.match}.visitor_id`,
          to:`${tableNames.team}.id`,
        },
      },
      league: {
        relation: Model.HasOneRelation,
        modelClass: League,
        join:{
          from: `${tableNames.match}.league_id`,
          to:`${tableNames.league}.id`,
        },
      },
      vod:{
        relation: Model.HasOneRelation,
        modelClass: Vod,
        join: {
          from: `${tableNames.match}.vods_id`,
          to: `${tableNames.vods}.id`
        }
      }
    }
  }
}

module.exports = Match;