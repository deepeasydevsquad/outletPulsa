"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Pakets", {
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
      activity_type: {
        type: Sequelize.ENUM,
        values: ["haji", "umrah"],
        defaultValue: "umrah",
      },
      code: {
        type: Sequelize.STRING,
      },
      photo: {
        type: Sequelize.STRING,
      },
      name: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.TEXT,
      },
      departure_date: {
        type: Sequelize.DATEONLY,
      },
      return_date: {
        type: Sequelize.DATEONLY,
      },
      quota: {
        type: Sequelize.INTEGER,
      },
      facilities: {
        type: Sequelize.TEXT,
      },
      paket_status: {
        type: Sequelize.ENUM,
        values: ["buka", "tutup"],
        defaultValue: "buka",
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
    await queryInterface.dropTable("Pakets");
  },
};
