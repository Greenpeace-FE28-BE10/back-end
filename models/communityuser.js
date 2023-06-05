'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class communityUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  communityUser.init({
    users_id: DataTypes.INTEGER,
    communities_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'communityUser',
  });
  return communityUser;
};