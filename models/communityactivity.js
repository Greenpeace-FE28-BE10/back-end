"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class communityActivity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  communityActivity.init(
    {
      communities_id: DataTypes.INTEGER,
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      date: DataTypes.DATE,
      status: {
        type: DataTypes.ENUM,
        values: ["upcoming", "on progress", "done"],
        defaultValue: "upcoming",
      },
    },
    {
      sequelize,
      modelName: "communityActivity",
    }
  );
  return communityActivity;
};
