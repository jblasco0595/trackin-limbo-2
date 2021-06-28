'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TrakedHours extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      TrakedHours.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });
      TrakedHours.belongsTo(models.Project, {
        foreignKey: 'projectId',
        as: 'project'
      });
    }
  };
  TrakedHours.init({
    userId: DataTypes.INTEGER,
    hour: DataTypes.INTEGER,
    description: DataTypes.STRING,
    projectId: DataTypes.INTEGER,
    invoiced: DataTypes.BOOLEAN,
    tested: DataTypes.BOOLEAN,
    finalized: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'TrakedHours',
  });
  return TrakedHours;
};