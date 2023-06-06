// import bcrypt
const bcrypt = require("bcrypt");
("use strict");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const users = [
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
    ];

    const saltRounds = 10; //jumlah putaran salt yang akan digunakan

    // hash password
    const hashedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, saltRounds);
        return {
          ...user,
          password: hashedPassword,
        };
      })
    );

    await queryInterface.bulkInsert("users", hashedUsers, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
