"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    static associate(models) {
      models.users.hasMany(models.reviews, {
        foreignKey: "userId",
        sourceKey: "id",
        onUpdate: "cascade",
        onDelete: "cascade",
      });

      models.users.belongsToMany(models.genres, {
        through: "genresUsers",
      });
    }
  }
  users.init(
    {
      // id: DataTypes.STRING,
      pw: DataTypes.STRING,
      userImg: DataTypes.STRING,
      email: DataTypes.STRING,
      salt: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "users",
    },
  );
  return users;
};
