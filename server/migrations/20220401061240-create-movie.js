"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface
      .createTable("movies", {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        title: {
          type: Sequelize.STRING,
        },
        titleEng: {
          type: Sequelize.STRING,
        },
        directorName: {
          type: Sequelize.STRING,
        },
        actorName: {
          type: Sequelize.STRING,
        },
        releaseDate: {
          type: Sequelize.DATE,
        },
        posterImg: {
          type: Sequelize.STRING,
        },
        plot: {
          type: Sequelize.STRING,
        },
        runtime: {
          type: Sequelize.STRING,
        },
        rating: {
          type: Sequelize.STRING,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      })
      .then(() => {
        queryInterface.addColumn("genresMovies", "movieId", {
          type: Sequelize.INTEGER,
          allowNull: true,
          onDelete: "CASCADE",
          references: { model: "movies", key: "id" },
        });
      });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("movies");
  },
};
