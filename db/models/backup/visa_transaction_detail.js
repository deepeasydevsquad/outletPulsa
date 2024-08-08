"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Visa_transaction_detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Visa_transaction_detail.belongsTo(models.Visa_request_type, {
        foreignKey: "visa_request_type_id",
      });
      Visa_transaction_detail.belongsTo(models.Company, {
        foreignKey: "company_id",
      });
      Visa_transaction_detail.belongsTo(models.Visa_transaction, {
        foreignKey: "transaction_visa_id",
      });
    }
  }
  Visa_transaction_detail.init(
    {
      company_id: DataTypes.INTEGER,
      transaction_visa_id: DataTypes.INTEGER,
      visa_request_type_id: DataTypes.INTEGER,
      request_date: DataTypes.DATE,
      name: DataTypes.STRING,
      identity_number: DataTypes.STRING,
      gender: DataTypes.ENUM(["laki_laki", "perempuan"]),
      birth_place: DataTypes.STRING,
      birth_date: DataTypes.DATE,
      citizenship: DataTypes.STRING,
      passport_number: DataTypes.STRING,
      date_issued: DataTypes.DATE,
      place_of_release: DataTypes.STRING,
      valid_until: DataTypes.DATE,
      profession_idn: DataTypes.STRING,
      profession_foreign: DataTypes.STRING,
      profession_address: DataTypes.TEXT,
      profession_city: DataTypes.STRING,
      profession_country: DataTypes.STRING,
      profession_telephone: DataTypes.STRING,
      price: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Visa_transaction_detail",
    }
  );
  return Visa_transaction_detail;
};
