"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Jurnals", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      company_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Companies",
          key: "id",
        },
      },
      source: {
        type: Sequelize.STRING,
      },
      ref: {
        type: Sequelize.TEXT,
      },
      ket: {
        type: Sequelize.TEXT,
      },
      akun_debet: {
        type: Sequelize.INTEGER,
      },
      akun_kredit: {
        type: Sequelize.INTEGER,
      },
      saldo: {
        type: Sequelize.INTEGER,
      },
      periode_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Periodes",
          key: "id",
        },
        defaultValue: null,
        allowNull: true,
      },
      status: {
        type: Sequelize.ENUM(["manual", "auto"]),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Jurnals");
  },
};
