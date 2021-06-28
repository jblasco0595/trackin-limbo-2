'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('TrakedHours', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id' 
        },
        allowNull: false
      },
      hour: {
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.STRING
      },
      projectId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Projects',
          key: 'id' 
        },
        allowNull: false
      },
      invoiced: {
        type: Sequelize.BOOLEAN
      },
      tested: {
        type: Sequelize.BOOLEAN
      },
      finalized: {
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('TrakedHours');
  }
};