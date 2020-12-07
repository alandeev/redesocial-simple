'use strict';

// const { QueryInterface } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 'profile_id', {
      type: Sequelize.INTEGER,
      references: { model: 'images', key: 'id' },
      onDelete: "set null",
      onUpdate: "set null"
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('users', 'profile_id')
  },
};
