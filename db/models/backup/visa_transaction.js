"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Visa_transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Visa_transaction.belongsTo(models.Company, {
        foreignKey: "company_id",
      });
      Visa_transaction.hasMany(models.Visa_transaction_detail, {
        foreignKey: "transaction_visa_id",
      });
    }
  }
  Visa_transaction.init(
    {
      company_id: DataTypes.INTEGER,
      invoice: DataTypes.STRING,
      receive: DataTypes.STRING,
      payer: DataTypes.STRING,
      payer_identity: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Visa_transaction",
    }
  );
  return Visa_transaction;
};
