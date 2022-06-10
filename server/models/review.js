"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class reviews extends Model {
    static associate(models) {
      models.reviews.belongsTo(models.users, {
        foreignKey: "userId",
        targetKey: "id",
        onUpdate: "cascade",
        onDelete: "cascade",
      });

      models.reviews.belongsTo(models.movies, {
        foreignKey: "movieId",
        targetKey: "id",
        onUpdate: "cascade",
        onDelete: "cascade",
      });
    }
  }
  reviews.init(
    {
      userId: DataTypes.STRING,
      movieId: DataTypes.INTEGER,
      comment: DataTypes.STRING,
      movieScore: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "reviews",
    },
  );
  return reviews;
};
