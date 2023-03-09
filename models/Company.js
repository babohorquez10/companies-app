const { Model } = require('objection');
const knex = require('../db/knex');

Model.knex(knex);

class Company extends Model {
  static get tableName() {
    return 'companies';
  }

  static get idColumn() {
    return 'nit';
  }
}

module.exports = Company;
