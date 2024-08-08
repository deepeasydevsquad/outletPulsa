"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Tabungan_umrah extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Tabungan_umrah.hasMany(models.Riwayat_tabungan_umrah, {
        foreignKey: "tabungan_umrah_id",
      });
      Tabungan_umrah.belongsTo(models.Company, {
        foreignKey: "company_id",
      });
      Tabungan_umrah.belongsTo(models.Jamaah, {
        foreignKey: "jamaah_id",
      });
      Tabungan_umrah.belongsTo(models.Company_staff, {
        foreignKey: "user_id",
      });
      Tabungan_umrah.belongsTo(models.Paket, {
        foreignKey: "target_paket_id",
      });
    }
  }
  Tabungan_umrah.init(
    {
      company_id: DataTypes.INTEGER,
      jamaah_id: DataTypes.INTEGER,
      saldo_tabungan: DataTypes.INTEGER,
      target_paket_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Tabungan_umrah",
    }
  );
  return Tabungan_umrah;
};
