const { Model } = require('objection');

const tableNames = require('../../constants/tableNames');
const schema = require('./teams.schema.json');
const Acronym = require('../acronyms/acronyms.model');
const Logo = require('../logos/logos.model');


class Team extends Model {
  static get tableName(){
    return tableNames.team;
  }

  static get jsonSchema(){
    return schema;
  }

  static get relationMappings(){
    return {
      acronym: {
        relation: Model.HasOneRelation,
        modelClass: Acronym,
        join:{
          from: `${tableNames.team}.acronym_id`,
          to: `${tableNames.acronym}.id`,
        },
      },
      logo: {
        relation: Model.HasOneRelation,
        modelClass: Logo,
        join:{
          from: `${tableNames.team}.logo_id`,
          to: `${tableNames.logo}.id`,
        },
      }
    }
  }
}

module.exports = Team;