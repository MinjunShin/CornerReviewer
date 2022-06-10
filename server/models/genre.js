"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class genres extends Model {
    static associate(models) {
      models.genres.belongsToMany(models.users, {
        through: "genresUsers",
        foreignKey: "genreName",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        sourceKey: "genreName",
      });

      models.genres.belongsToMany(models.movies, {
        through: "genresUsers",
        foreignKey: "genreName",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        sourceKey: "genreName",
      });
    }
  }
  genres.init(
    {
      genreName: {
        type: DataTypes.STRING,
      },
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
    },
    {
      sequelize, // db connection
      modelName: "genres", // model name,
      charset: "utf8",
    },
  );
  return genres;
};
