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
          image: "https://images.pexels.com/photos/7656124/pexels-photo-7656124.jpeg?auto=compress&cs=tinysrgb&w=600",
          postal_code: "20153",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          leader_id: 2,
          name: "Komunitas Hijauin Dairi",
          location: "Kab. Dairi, Sumatera Utara",
          description: "Komunitas Hijauin Dairi adalah Lorem ipsum dolor sit Amet.",
          image: "https://images.pexels.com/photos/7656743/pexels-photo-7656743.jpeg?auto=compress&cs=tinysrgb&w=600",
          postal_code: "22211",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          leader_id: 3,
          name: "Komunitas Hijauin Jakarta",
          location: "Jakarta",
          description: "Komunitas Hijauin Jakarta adalah Lorem ipsum dolor sit Amet.",
          image: "https://images.pexels.com/photos/7656992/pexels-photo-7656992.jpeg?auto=compress&cs=tinysrgb&w=600",
          postal_code: "10210",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          leader_id: 4,
          name: "Komunitas Hijauin Palembang",
          location: "Kota Palembang",
          description: "Komunitas Hijauin Palembang adalah Lorem ipsum dolor sit Amet.",
          image: "https://images.pexels.com/photos/7656629/pexels-photo-7656629.jpeg?auto=compress&cs=tinysrgb&w=600",
          postal_code: "30117",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          leader_id: 5,
          name: "Komunitas Hijauin Universitas Sumatera Utara",
          location: "Medan Kota",
          description: "Komunitas Hijauin Medan adalah Lorem ipsum dolor sit Amet.",
          image: "https://images.pexels.com/photos/7656990/pexels-photo-7656990.jpeg?auto=compress&cs=tinysrgb&w=600",
          postal_code: "20229",
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
