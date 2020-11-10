'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: Sequelize.STRING,
      email: {
        type: Sequelize.STRING,
        unique: true,
        validate: {
          isLowercase: true
        },
      },
      password: Sequelize.STRING,
      photo: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      is_admin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  }
};
