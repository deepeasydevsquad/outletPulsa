"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Riwayat_tabungan_umrah extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Riwayat_tabungan_umrah.belongsTo(models.Company, {
        foreignKey: "company_id",
      });
      Riwayat_tabungan_umrah.belongsTo(models.Tabungan_umrah, {
        foreignKey: "tabungan_umrah_id",
      });
      Riwayat_tabungan_umrah.belongsTo(models.Company_staff, {
        foreignKey: "user_id",
      });
    }
  }
  Riwayat_tabungan_umrah.init(
    {
      company_id: DataTypes.INTEGER,
      tabungan_umrah_id: DataTypes.INTEGER,
      transaction_code: DataTypes.STRING,
      saldo: DataTypes.INTEGER,
      type: DataTypes.ENUM(["deposit", "refund", "beli_paket"]),
      user_id: DataTypes.INTEGER,
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Riwayat_tabungan_umrah",
    }
  );
  return Riwayat_tabungan_umrah;
};
