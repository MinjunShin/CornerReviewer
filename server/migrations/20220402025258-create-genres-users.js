"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("genresUsers", "movieId", {
      type: Sequelize.INTEGER,
      allowNull: true, // movie에만 있는 genre일 수 도 있으므로
      onDelete: "CASCADE",
      references: { model: "movies", key: "id" },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("genresUsers", "movieId");
  },
};
