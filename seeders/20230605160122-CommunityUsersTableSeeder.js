"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "communityUsers",
      [
        {
          communities_id: 1,
          users_id: 1,
          community_role: "leader",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          communities_id: 2,
          users_id: 2,
          community_role: "leader",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          communities_id: 3,
          users_id: 3,
          community_role: "leader",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          communities_id: 4,
          users_id: 4,
          community_role: "leader",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          communities_id: 5,
          users_id: 5,
          community_role: "leader",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          communities_id: 1,
          users_id: 6,
          community_role: "member",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          communities_id: 2,
          users_id: 7,
          community_role: "member",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          communities_id: 3,
          users_id: 8,
          community_role: "member",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          communities_id: 4,
          users_id: 9,
          community_role: "member",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          communities_id: 5,
          users_id: 10,
          community_role: "member",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("communityUsers", null, {});
  },
};
