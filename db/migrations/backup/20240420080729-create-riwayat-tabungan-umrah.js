"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Riwayat_tabungan_umrahs", {
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
      tabungan_umrah_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Tabungan_umrahs",
          key: "id",
        },
      },
      transaction_code: {
        type: Sequelize.STRING,
      },
      saldo: {
        type: Sequelize.INTEGER,
      },
      type: {
        type: Sequelize.ENUM,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Company_staffs",
          key: "id",
        },
        defaultValue: null,
        allowNull: true,
      },
      name: {
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
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Riwayat_tabungan_umrahs");
  },
};
