"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface
      .addColumn("movies", "startIdx", {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: "CASCADE",
      })
      .then(() => {
        queryInterface.addColumn("movies", "apiIdx", {
          type: Sequelize.INTEGER,
          allowNull: false,
          onDelete: "CASCADE",
        });
      });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("movies", "startIdx").then(() => {
      queryInterface.removeColumn("movies", "apiIdx");
    });
  },
};
