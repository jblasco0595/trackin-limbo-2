'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('TrakedHoursConditions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      conditionId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Conditions',
          key: 'id' 
        },
        allowNull: false
      },
      trackedHourId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'TrakedHours',
          key: 'id' 
        },
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('TrakedHoursConditions');
  }
};