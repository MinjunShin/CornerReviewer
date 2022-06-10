"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("movies", "genre", {
      type: Sequelize.STRING,
      allowNull: false,
      onDelete: "CASCADE",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("movies", "genre");
  },
};
