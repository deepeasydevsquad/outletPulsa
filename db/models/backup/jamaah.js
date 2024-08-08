"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Jamaah extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Jamaah.belongsTo(models.Profession, {
        foreignKey: "profession_id",
      });
      Jamaah.belongsTo(models.Company, {
        foreignKey: "company_id",
      });
      Jamaah.hasMany(models.Riwayat_penyakit, {
        foreignKey: "jamaah_id",
      });
    }
  }
  Jamaah.init(
    {
      company_id: DataTypes.INTEGER,
      title: DataTypes.ENUM(["tuan", "nona", "nyonya"]),
      name: DataTypes.STRING,
      gender: DataTypes.ENUM(["laki_laki", "perempuan"]),
      birth_date: DataTypes.DATE,
      birth_place: DataTypes.STRING,
      identity_number: DataTypes.INTEGER,
      identity_type: DataTypes.ENUM(["ktp", "nomor_passport"]),
      mobile_phone: DataTypes.STRING,
      email: DataTypes.STRING,
      address: DataTypes.TEXT,
      family_name: DataTypes.STRING,
      family_mobile_phone: DataTypes.STRING,
      family_address: DataTypes.TEXT,
      citizenship: DataTypes.ENUM(["wni", "wna"]),
      profession_id: DataTypes.INTEGER,
      marital_status: DataTypes.ENUM(["merried", "not_merried"]),
      saldo_deposit: DataTypes.INTEGER,
      saldo_tabungan: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Jamaah",
    }
  );
  return Jamaah;
};
