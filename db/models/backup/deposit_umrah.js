"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Deposit_umrah extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Deposit_umrah.belongsTo(models.Company, {
        foreignKey: "company_id",
      });
      Deposit_umrah.belongsTo(models.Jamaah, {
        foreignKey: "jamaah_id",
      });
      Deposit_umrah.belongsTo(models.Company_staff, {
        foreignKey: "user_id",
      });
    }
  }
  Deposit_umrah.init(
    {
      company_id: DataTypes.INTEGER,
      jamaah_id: DataTypes.INTEGER,
      transaction_code: DataTypes.STRING,
      saldo: DataTypes.INTEGER,
      type: DataTypes.ENUM([
        "deposit",
        "tabungan_umrah",
        "withdraw",
        "beli_paket",
      ]),
      info: DataTypes.TEXT,
      user_id: DataTypes.INTEGER,
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Deposit_umrah",
    }
  );
  return Deposit_umrah;
};
