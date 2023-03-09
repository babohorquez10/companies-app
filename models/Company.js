const { Model } = require('objection');
const knex = require('../db/knex');
const Inventory = require('./Inventory');

Model.knex(knex);

class Company extends Model {
  static get tableName() {
    return 'companies';
  }

  static get idColumn() {
    return 'nit';
  }

  static get relationMappings() {
    return {
      inventory: {
        relation: Model.HasManyRelation,
        modelClass: Inventory,
        join: {
          from: 'companies.nit',
          to: 'inventory.companyId',
        },
      },
    };
  }
}

module.exports = Company;
