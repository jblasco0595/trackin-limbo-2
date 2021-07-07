'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TeamMember extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      TeamMember.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });
      TeamMember.belongsTo(models.Team, {
        foreignKey: 'teamId',
        as: 'team'
      });
    }
  };
  TeamMember.init({
    userId: DataTypes.INTEGER,
    teamId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'TeamMember',
  });
  return TeamMember;
};