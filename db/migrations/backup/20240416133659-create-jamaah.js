"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Jamaahs", {
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
      title: {
        type: Sequelize.ENUM,
        values: ["tuan", "nona", "nyonya"],
      },
      name: {
        type: Sequelize.STRING,
      },
      gender: {
        type: Sequelize.ENUM,
        values: ["laki_laki", "perempuan"],
      },
      birth_date: {
        type: Sequelize.DATE,
      },
      birth_place: {
        type: Sequelize.STRING,
      },
      identity_number: {
        type: Sequelize.INTEGER,
      },
      identity_type: {
        type: Sequelize.ENUM,
        values: ["ktp", "nomor_passport"],
      },
      mobile_phone: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      address: {
        type: Sequelize.TEXT,
      },
      family_name: {
        type: Sequelize.STRING,
      },
      family_mobile_phone: {
        type: Sequelize.STRING,
      },
      family_address: {
        type: Sequelize.TEXT,
      },
      citizenship: {
        type: Sequelize.ENUM,
        values: ["wni", "wna"],
      },
      profession_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Professions",
          key: "id",
        },
      },
      marital_status: {
        type: Sequelize.ENUM,
        values: ["merried", "not_merried"],
      },
      saldo_deposit: {
        type: Sequelize.STRING,
      },
      saldo_tabungan: {
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
    await queryInterface.dropTable("Jamaahs");
  },
};
