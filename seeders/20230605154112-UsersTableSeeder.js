"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          name: "Annelis Mellema",
          email: "annelis@gmail.com",
          password: "rahasia",
          address: "Jl. Jamin Ginting No.1",
          role: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Andrea Hirata",
          email: "andrea@gmail.com",
          password: "rahasia",
          address: "Jl. Jamin Ginting No.2",
          role: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Ken",
          email: "ken@gmail.com",
          password: "rahasia",
          address: "Jl. Jamin Ginting No.3",
          role: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Casey",
          email: "casey@gmail.com",
          password: "rahasia",
          address: "Jl. Jamin Ginting No.4",
          role: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Anna",
          email: "anna@gmail.com",
          password: "rahasia",
          address: "Jl. Jamin Ginting No.5",
          role: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
