'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserSpecialty extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserSpecialty.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });
      UserSpecialty.belongsTo(models.Specialty, {
        foreignKey: 'specialtyId',
        as: 'specialty'
      });
    }
  };
  UserSpecialty.init({
    userId: DataTypes.INTEGER,
    specialtyId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserSpecialty',
  });
  return UserSpecialty;
};