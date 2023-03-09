const { Model } = require('objection');
const knex = require('../db/knex');
const Company = require('./Company');

Model.knex(knex);

class Inventory extends Model {
  static get tableName() {
    return 'inventory';
  }

  static get idColumn() {
    return ['articleName', 'companyId'];
  }

  static get relationMappings() {
    return {
      company: {
        relation: Model.BelongsToOneRelation,
        modelClass: Company,
        join: {
          from: 'inventory.companyId',
          to: 'companies.nit',
        },
      },
    };
  }
}

module.exports = Inventory;
