"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "communityUsers",
      [
        {
          communities_id: 41,
          users_id: 36,
          community_role: "leader",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          communities_id: 42,
          users_id: 37,
          community_role: "leader",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          communities_id: 43,
          users_id: 38,
          community_role: "leader",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          communities_id: 44,
          users_id: 39,
          community_role: "leader",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          communities_id: 45,
          users_id: 40,
          community_role: "leader",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          communities_id: 41,
          users_id: 41,
          community_role: "member",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          communities_id: 42,
          users_id: 42,
          community_role: "member",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          communities_id: 43,
          users_id: 43,
          community_role: "member",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          communities_id: 44,
          users_id: 44,
          community_role: "member",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          communities_id: 45,
          users_id: 45,
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
