"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface
      .createTable("genres", {
        genreName: {
          allowNull: false,
          primaryKey: true,
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
        queryInterface.addColumn("genresUsers", "genreName", {
          type: Sequelize.STRING,
          allowNull: true, // movie에만 있는 genre일 수 도 있으므로
          onDelete: "CASCADE",
          references: { model: "genres", key: "genreName" },
        });
      })
      .then(() => {
        queryInterface.addColumn("genresMovies", "genreName", {
          type: Sequelize.STRING,
          allowNull: true, // movie에만 있는 genre일 수 도 있으므로
          onDelete: "CASCADE",
          references: { model: "genres", key: "genreName" },
        });
      });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("genres");
  },
};
