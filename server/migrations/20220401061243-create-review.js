"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface
      .createTable("reviews", {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        comment: {
          type: Sequelize.STRING,
        },
        movieScore: {
          type: Sequelize.INTEGER,
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
        queryInterface.addColumn("reviews", "userId", {
          type: Sequelize.STRING,
          onDelete: "CASCADE",
          references: { model: "users", key: "id" },
        });
      })
      .then(() => {
        queryInterface.addColumn("reviews", "movieId", {
          type: Sequelize.INTEGER,
          onDelete: "CASCADE",
          references: { model: "movies", key: "id" },
        });
      });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("reviews");
  },
};
