"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "communities",
      [
        {
          leader_id: 1,
          name: "Komunitas Hijauin Medan",
          location: "Medan",
          description: "Komunitas Hijauin Medan adalah Lorem ipsum dolor sit Amet.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          leader_id: 2,
          name: "Komunitas Hijauin Dairi",
          location: "Kab. Dairi, Sumatera Utara",
          description: "Komunitas Hijauin Dairi adalah Lorem ipsum dolor sit Amet.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          leader_id: 3,
          name: "Komunitas Hijauin Jakarta",
          location: "Jakarta",
          description: "Komunitas Hijauin Jakarta adalah Lorem ipsum dolor sit Amet.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          leader_id: 4,
          name: "Komunitas Hijauin Palembang",
          location: "Kota Palembang",
          description: "Komunitas Hijauin Palembang adalah Lorem ipsum dolor sit Amet.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          leader_id: 5,
          name: "Komunitas Hijauin Universitas Sumatera Utara",
          location: "Medan Kota",
          description: "Komunitas Hijauin Medan adalah Lorem ipsum dolor sit Amet.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("communities", null, {});
  },
};
