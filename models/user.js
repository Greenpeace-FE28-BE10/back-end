"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define association with CommunityUserModel
      user.hasMany(models.communityUser, {
        foreignKey: "users_id",
        as: "CommunityUsers",
      });
    }
  }
  user.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      address: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.ENUM("admin", "user"),
    },
    {
      sequelize,
      modelName: "user",
    }
  );
  return user;
};
