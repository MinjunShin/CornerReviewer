"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface
      .createTable("users", {
        id: {
          allowNull: false,
          type: Sequelize.STRING,
          primaryKey: true,
        },
        pw: {
          type: Sequelize.STRING,
        },
        userImg: {
          type: Sequelize.STRING,
        },
        email: {
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
        queryInterface.addColumn("genresUsers", "userId", {
          type: Sequelize.STRING,
          allowNull: true, // movie에만 있는 genre일 수 도 있으므로
          onDelete: "CASCADE",
          references: { model: "users", key: "id" },
        });
      });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("users");
  },
};
