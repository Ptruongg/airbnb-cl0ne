'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Spots', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ownerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        reference: {
          model: 'Users'
        },
        onDelete: 'CASCADE'
      },
      address: {
        type: Sequelize.STRING,

      },
      city: {
        type: Sequelize.STRING,

      },
      state: {
        type: Sequelize.STRING,

      },
      country: {
        type: Sequelize.STRING,

      },
      lat: {
        type: Sequelize.DECIMAL,

      },
      lng: {
        type: Sequelize.DECIMAL,

      },
      name: {
        type: Sequelize.STRING,

      },
      description: {
        type: Sequelize.TEXT,

      },
      price: {
        type: Sequelize.INTEGER,

      },
      avgRating: {
        type: Sequelize.DECIMAL,
      },
      previewImage: {
        type: Sequelize.STRING,
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Spots');
  }
};
