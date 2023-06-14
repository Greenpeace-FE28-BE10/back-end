"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("communities", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      location: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.TEXT,
      },
      leader_id: {
        type: Sequelize.INTEGER,
        references: { model: "users", key: "id" },
        foreignKey: true,
      },
      image: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      postal_code: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("communities");
  },
};
