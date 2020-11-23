const { DataTypes } = require('sequelize');
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('comments', { 
      id: {
        type: Sequelize.INTEGER,
        isPrimary: true,
        autoIncrement: true
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false
      },
      post_id: {
        type: DataTypes.INTEGER,
        references: { model: 'posts', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false
      },
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('comments');
  }
};
