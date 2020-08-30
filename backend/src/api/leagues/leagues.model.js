const { Model } = require('objection');

const tableNames = require('../../constants/tableNames');
const schema = require('./leagues.schema.json');
const Logo = require('../logos/logos.model');

class League extends Model{
  static get tableName(){
    return tableNames.league;
  }

  static get jsonSchema(){
    return schema
  }

  static get relationMappings(){
    return{
      logo: {
        relation: Model.HasOneRelation,
        modelClass: Logo,
        join: {
          from: `${tableNames.league}.logo_id`,
          to: `${tableNames.logo}.id`
        }
      },
    }
  }
};

module.exports = League;