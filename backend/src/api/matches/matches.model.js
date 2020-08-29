const { Model } = require('objection');

const tableNames = require('../../constants/tableNames');
const matchSchema = require('./matches.schema.json');
const Leagues = require('../leagues/leagues.models');


class Match extends Model {
  static get tableName() {
    return tableNames.match;
  }
  static get jsonSchema(){
    return matchSchema;
  }
  static get relationMappings(){
    return {
      league: {
        relation: Model.HasOneRelation,
        modelClass: Leagues,
        join:{
          from: `${tableNames.match}.league_id`,
          to: `${tableNames.league}.id`,
        },
      },
    };
  }
}

module.exports = Match;