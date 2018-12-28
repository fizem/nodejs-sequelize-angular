const uuidv4 = require('uuid/v4');

'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Resources', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      NAME: {
        type: Sequelize.STRING
      },
      DISPLAYNAME: {
        type: Sequelize.STRING
      },
      TECHNICALNAME: {
        type: Sequelize.STRING
      },
      STATUS: {
        type: Sequelize.STRING
      },
      RESOURCEOWNER: {
        type: Sequelize.STRING
      },
      RESOURCEMANAGER: {
        type: Sequelize.STRING
      },
      ARCHITECTE: {
        type: Sequelize.STRING
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Resources');
  }
};
