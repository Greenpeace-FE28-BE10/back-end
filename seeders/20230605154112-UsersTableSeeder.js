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
          name: "Seiji Amazawa",
          email: "seiji@gmail.com",
          password: await bcrypt.hash("rahasia", saltRounds),
          address: "Jl. Sudirman No.222, Medan",
          role: "admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Miyamizu Mitsuha",
          email: "mitsuha@gmail.com",
          password: await bcrypt.hash("rahasia", saltRounds),
          address: "Jl. Perjuangan No.3, Bandung",
          role: "admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Kiki",
          email: "kiki@gmail.com",
          password: await bcrypt.hash("rahasia", saltRounds),
          address: "Jl. Tuanku Imam Bonjol No.14, Semarang",
          role: "user",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Anjani Setiawan",
          email: "anjani@gmail.com",
          password: await bcrypt.hash("rahasia", saltRounds),
          address: "Jl. Bunga Melati No.23, Blok C, Semarang",
          role: "user",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Greg Gonzalez",
          email: "greg@gmail.com",
          password: await bcrypt.hash("rahasia", saltRounds),
          address: "Jl. Country Roads 222, Medan",
          role: "user",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Matty Healy",
          email: "matty@gmail.com",
          password: await bcrypt.hash("rahasia", saltRounds),
          address: "Jl. Perjuangan 1975, Siantar",
          role: "user",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Patrick Watson",
          email: "patrick@gmail.com",
          password: await bcrypt.hash("rahasia", saltRounds),
          address: "Jl. Sudirman No.97, Medan",
          role: "user",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Umar Hilmi",
          email: "umarhilmi@gmail.com",
          password: await bcrypt.hash("rahasia", saltRounds),
          address: "Jl. Matahari Terbit No.13, Perumahan Matahari Indah, Surabaya",
          role: "user",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "David Hartono",
          email: "davidhartono@gmail.com",
          password: await bcrypt.hash("rahasia", saltRounds),
          address: "Jl. Abdul Hakim No.18, Kota Medan",
          role: "user",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Leo Alfonso Tarigan",
          email: "leoalfonso@gmail.com",
          password: await bcrypt.hash("rahasia", saltRounds),
          address: "Jl. Janji Berani No.98, Medan",
          role: "user",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Firman Ramadhani",
          email: "firman@gmail.com",
          password: await bcrypt.hash("rahasia", saltRounds),
          address: "Jl. Sukamaju No.17",
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
