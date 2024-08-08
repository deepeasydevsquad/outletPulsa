"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Tabungan_umrahs", {
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
      jamaah_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Jamaahs",
          key: "id",
        },
      },
      saldo_tabungan: {
        type: Sequelize.INTEGER,
      },
      target_paket_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Pakets",
          key: "id",
        },
        defaultValue: null,
        allowNull: true,
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
    await queryInterface.dropTable("Tabungan_umrahs");
  },
};
