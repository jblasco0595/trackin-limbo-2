'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserWorkspace extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserWorkspace.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });
      UserWorkspace.belongsTo(models.WorkSpace, {
        foreignKey: 'workspaceId',
        as: 'workspace'
      });
    }
  };
  UserWorkspace.init({
    userId: DataTypes.INTEGER,
    workspaceId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserWorkspace',
  });
  return UserWorkspace;
};