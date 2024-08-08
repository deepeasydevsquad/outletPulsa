"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Itineraries", {
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
      paket_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Pakets",
          key: "id",
        },
      },
      city_id_from: {
        type: Sequelize.INTEGER,
        references: {
          model: "Cities",
          key: "id",
        },
      },
      city_id_destination: {
        type: Sequelize.INTEGER,
        references: {
          model: "Cities",
          key: "id",
        },
      },
      kendaraan: {
        type: Sequelize.ENUM(["car", "airplane"]),
      },
      car_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Cities",
          key: "id",
        },
        defaultValue: null,
        allowNull: true,
      },
      airplane_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Airlines",
          key: "id",
        },
        defaultValue: null,
        allowNull: true,
      },
      bandara_id_from: {
        type: Sequelize.INTEGER,
        references: {
          model: "Bandaras",
          key: "id",
        },
        defaultValue: null,
        allowNull: true,
      },
      bandara_id_destination: {
        type: Sequelize.INTEGER,
        references: {
          model: "Bandaras",
          key: "id",
        },
        defaultValue: null,
        allowNull: true,
      },
      departure_date: {
        type: Sequelize.DATEONLY,
      },
      arrival_date: {
        type: Sequelize.DATEONLY,
      },
      hotel_id_from: {
        type: Sequelize.INTEGER,
        references: {
          model: "Hotels",
          key: "id",
        },
        defaultValue: null,
        allowNull: true,
      },
      hotel_id_destination: {
        type: Sequelize.INTEGER,
        references: {
          model: "Hotels",
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
    await queryInterface.dropTable("Itineraries");
  },
};
