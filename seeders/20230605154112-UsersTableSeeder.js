const bcrypt = require("bcrypt");

("use strict");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // jumlah putaran enkripsi salt
    const saltRounds = 10;

    await Promise.all(
      [
        {
          name: "Annelis Mellema",
          email: "annelis@gmail.com",
          password: await bcrypt.hash("rahasia", saltRounds),
          address: "Jl. Jamin Ginting No.1",
          role: "user",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Andrea Hirata",
          email: "andrea@gmail.com",
          password: await bcrypt.hash("rahasia", saltRounds),
          address: "Jl. Jamin Ginting No.2",
          role: "user",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Ken",
          email: "ken@gmail.com",
          password: await bcrypt.hash("rahasia", saltRounds),
          address: "Jl. Jamin Ginting No.3",
          role: "user",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Casey",
          email: "casey@gmail.com",
          password: await bcrypt.hash("rahasia", saltRounds),
          address: "Jl. Jamin Ginting No.4",
          role: "user",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Anna",
          email: "anna@gmail.com",
          password: await bcrypt.hash("rahasia", saltRounds),
          address: "Jl. Jamin Ginting No.5",
          role: "user",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Sufjan",
          email: "sufjan@gmail.com",
          password: await bcrypt.hash("rahasia", saltRounds),
          address: "Jl. Sudirman No.1",
          role: "user",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Stevens",
          email: "stevens@gmail.com",
          password: await bcrypt.hash("rahasia", saltRounds),
          address: "Jl. Sudirman No.2",
          role: "user",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Alexander",
          email: "alexander@gmail.com",
          password: await bcrypt.hash("rahasia", saltRounds),
          address: "Jl. Sudirman No.3",
          role: "user",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "David",
          email: "david@gmail.com",
          password: await bcrypt.hash("rahasia", saltRounds),
          address: "Jl. Jamin Ginting No.5",
          role: "user",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Turner",
          email: "turner@gmail.com",
          password: await bcrypt.hash("rahasia", saltRounds),
          address: "Jl. Jamin Ginting No.5",
          role: "user",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ].map((user) => queryInterface.bulkInsert("users", [user]))
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
