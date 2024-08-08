"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Setting_companies", {
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
      img_header_invoice: {
        type: Sequelize.STRING,
      },
      header_invoice: {
        type: Sequelize.STRING,
      },
      nama_kota: {
        type: Sequelize.STRING,
      },
      telp: {
        type: Sequelize.STRING,
      },
      whatsapp: {
        type: Sequelize.STRING,
      },
      pos_code: {
        type: Sequelize.STRING,
      },
      email_invoice: {
        type: Sequelize.STRING,
      },
      address_invoice: {
        type: Sequelize.STRING,
      },
      note_invoice: {
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
    await queryInterface.dropTable("Setting_companies");
  },
};
