"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Bank extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Bank.belongsTo(models.Company, {
        foreignKey: "company_id",
      });
      Bank.hasMany(models.Supplier, {
        foreignKey: "bank_id",
      });
    }
  }
  Bank.init(
    {
      company_id: DataTypes.INTEGER,
      code: DataTypes.STRING,
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Bank",
    }
  );
  return Bank;
};
