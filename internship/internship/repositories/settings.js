const { DataTypes, Sequelize, Op } = require('sequelize');
const ErrorList = require('../errors/list');
const cache = require('memory-cache');

class SettingsRepository {
  async getValueByKey(key) {}
}

class sequelizeSettingsRepository extends SettingsRepository {
  /**
   *
   * @param {Sequelize} sequelize
   */
  constructor(sequelize) {
    super();
    const model = sequelize.model('settings');

    Object.defineProperties(this, {
      sequelize: {
        value: sequelize,
        writable: false,
      },
      model: {
        value: model,
        writable: false,
      },
    });
  }

  async getValueByKey(key) {
    try {
      const result = await this.model.findOne({
        where: {
          key: key,
        },
      });

      if (result === null) {
        return [undefined, ErrorList.ErrorValueNotFound];
      }

      return [result, undefined];
    } catch (err) {
      console.log(err);
      return [undefined, err];
    }
  }
}

function newSequelizeSettingsRepository(sequelize) {
  return new sequelizeSettingsRepository(sequelize);
}

module.exports = {
  SettingsRepository,
  newSequelizeSettingsRepository,
};
