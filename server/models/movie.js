"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class movies extends Model {
    static associate(models) {
      models.movies.hasMany(models.reviews, {
        foreignKey: "movieId",
        sourceKey: "id",
        onUpdate: "cascade",
        onDelete: "cascade",
      });

      models.movies.belongsToMany(models.genres, {
        through: "genresUsers",
      });
    }
  }
  movies.init(
    {
      title: DataTypes.STRING,
      titleEng: DataTypes.STRING,
      directorName: DataTypes.STRING,
      actorName: DataTypes.STRING,
      releaseDate: DataTypes.DATE,
      posterImg: DataTypes.STRING,
      plot: DataTypes.STRING,
      runtime: DataTypes.STRING,
      rating: DataTypes.STRING,
      startIdx: DataTypes.INTEGER,
      apiIdx: DataTypes.INTEGER,
      genre: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "movies",
      charset: "utf8mb4",
    },
  );
  return movies;
};
