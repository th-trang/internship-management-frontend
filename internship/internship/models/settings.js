const { DataTypes } = require('sequelize');
const { SETTINGS_MODEL_NAME } = require('./const');

function defineSettings(sequelize) {
  sequelize.define(
    SETTINGS_MODEL_NAME,
    {
      key: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      value: DataTypes.STRING,
    },
    {
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    }
  );
}

module.exports = {
  defineSettings,
};
