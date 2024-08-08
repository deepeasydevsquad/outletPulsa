"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Kas_keluar_masuks", {
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
      invoice: {
        type: Sequelize.STRING,
      },
      dibayar_diterima: {
        type: Sequelize.STRING,
      },
      receiver: {
        type: Sequelize.STRING,
      },
      status_kwitansi: {
        type: Sequelize.ENUM(["keluar", "masuk"]),
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
    await queryInterface.dropTable("Kas_keluar_masuks");
  },
};
