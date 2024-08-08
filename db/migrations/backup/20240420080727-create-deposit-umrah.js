"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Deposit_umrahs", {
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
      transaction_code: {
        type: Sequelize.STRING,
      },
      saldo: {
        type: Sequelize.INTEGER,
      },
      type: {
        type: Sequelize.ENUM,
        values: ["deposit", "tabungan_umrah", "withdraw", "beli_paket"],
        defaultValue: null,
        allowNull: true,
      },
      info: {
        type: Sequelize.TEXT,
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
    await queryInterface.dropTable("Deposit_umrahs");
  },
};
