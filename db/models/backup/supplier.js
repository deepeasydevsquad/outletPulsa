"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Supplier extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Supplier.belongsTo(models.Company, {
        foreignKey: "company_id",
      });
      Supplier.belongsTo(models.Bank, {
        foreignKey: "bank_id",
      });
    }
  }
  Supplier.init(
    {
      company_id: DataTypes.INTEGER,
      name: DataTypes.STRING,
      address: DataTypes.STRING,
      bank_id: DataTypes.INTEGER,
      bank_account: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Supplier",
    }
  );
  return Supplier;
};
