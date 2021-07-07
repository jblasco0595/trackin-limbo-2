'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserHourlyPayment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserHourlyPayment.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });
      UserHourlyPayment.belongsTo(models.HourlyPayment, {
        foreignKey: 'hourlyPaymentId',
        as: 'hourlyPayment'
      });
    }
  };
  UserHourlyPayment.init({
    userId: DataTypes.INTEGER,
    hourlyPaymentId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserHourlyPayment',
  });
  return UserHourlyPayment;
};