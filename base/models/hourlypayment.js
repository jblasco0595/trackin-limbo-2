'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HourlyPayment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      HourlyPayment.belongsTo(models.Courrencie, {
        foreignKey: 'courrencieId',
        as: 'team'
      });
    }
  };
  HourlyPayment.init({
    amount: DataTypes.FLOAT,
    courrencieId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'HourlyPayment',
  });
  return HourlyPayment;
};