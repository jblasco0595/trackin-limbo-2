'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TrakedHoursCondition extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      TrakedHoursCondition.belongsTo(models.Condition, {
        foreignKey: 'conditionId',
        as: 'condition'
      });
      TrakedHoursCondition.belongsTo(models.TrakedHours, {
        foreignKey: 'trackedHourId',
        as: 'trackedHour'
      });
    }
  };
  TrakedHoursCondition.init({
    conditionId: DataTypes.INTEGER,
    trackedHourId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'TrakedHoursCondition',
  });
  return TrakedHoursCondition;
};