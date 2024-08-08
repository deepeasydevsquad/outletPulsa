'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Visa_transaction_details', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      company_id: {
        type: Sequelize.INTEGER
      },
      transaction_visa_id: {
        type: Sequelize.INTEGER
      },
      visa_request_type_id: {
        type: Sequelize.INTEGER
      },
      request_date: {
        type: Sequelize.DATE
      },
      name: {
        type: Sequelize.STRING
      },
      identity_number: {
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.ENUM
      },
      birth_place: {
        type: Sequelize.STRING
      },
      birth_date: {
        type: Sequelize.DATE
      },
      citizenship: {
        type: Sequelize.STRING
      },
      passport_number: {
        type: Sequelize.STRING
      },
      date_issued: {
        type: Sequelize.DATE
      },
      place_of_release: {
        type: Sequelize.STRING
      },
      valid_until: {
        type: Sequelize.DATE
      },
      profession_idn: {
        type: Sequelize.STRING
      },
      profession_foreign: {
        type: Sequelize.STRING
      },
      profession_address: {
        type: Sequelize.TEXT
      },
      profession_city: {
        type: Sequelize.STRING
      },
      profession_country: {
        type: Sequelize.STRING
      },
      profession_telephone: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Visa_transaction_details');
  }
};