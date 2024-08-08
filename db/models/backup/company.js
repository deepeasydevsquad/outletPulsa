"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Company.hasMany(models.Company_administrator, {
        foreignKey: "company_id",
      });
      Company.hasMany(models.Company_staff, {
        foreignKey: "company_id",
      });
      Company.hasMany(models.Cabang, {
        foreignKey: "company_id",
      });
      Company.hasMany(models.Paket_type, {
        foreignKey: "company_id",
      });
      Company.hasMany(models.System_log, {
        foreignKey: "company_id",
      });
      Company.hasMany(models.Bank, {
        foreignKey: "company_id",
      });
      Company.hasMany(models.Airlines, {
        foreignKey: "company_id",
      });
      Company.hasMany(models.Facilities, {
        foreignKey: "company_id",
      });
      Company.hasMany(models.City, {
        foreignKey: "company_id",
      });
      Company.hasMany(models.Hotel, {
        foreignKey: "company_id",
      });
      Company.hasMany(models.Car, {
        foreignKey: "company_id",
      });
      Company.hasMany(models.Bandara, {
        foreignKey: "company_id",
      });
      Company.hasMany(models.Provider, {
        foreignKey: "company_id",
      });
      Company.hasMany(models.Asuransi, {
        foreignKey: "company_id",
      });
      Company.hasMany(models.Setting_company, {
        foreignKey: "company_id",
      });
      Company.hasMany(models.Penyakit, {
        foreignKey: "company_id",
      });
      Company.hasMany(models.Profession, {
        foreignKey: "company_id",
      });
      Company.hasMany(models.Jamaah, {
        foreignKey: "company_id",
      });
      Company.hasMany(models.Riwayat_penyakit, {
        foreignKey: "company_id",
      });
      Company.hasMany(models.Tabungan_umrah, {
        foreignKey: "company_id",
      });
      Company.hasMany(models.Riwayat_tabungan_umrah, {
        foreignKey: "company_id",
      });
      Company.hasMany(models.Deposit_umrah, {
        foreignKey: "company_id",
      });
      Company.hasMany(models.Paket, {
        foreignKey: "company_id",
      });
      Company.hasMany(models.Paket_type_price, {
        foreignKey: "company_id",
      });
      Company.hasMany(models.Itinerary, {
        foreignKey: "company_id",
      });
      Company.hasMany(models.Kas_keluar_masuk, {
        foreignKey: "company_id",
      });
      Company.hasMany(models.Jurnal, {
        foreignKey: "company_id",
      });
      Company.hasMany(models.Periode, {
        foreignKey: "company_id",
      });
      Company.hasMany(models.Secondary_akun, {
        foreignKey: "company_id",
      });
      Company.hasMany(models.Visa_transaction, {
        foreignKey: "company_id",
      });
      Company.hasMany(models.Visa_transaction_detail, {
        foreignKey: "company_id",
      });
    }
  }
  Company.init(
    {
      code: DataTypes.STRING,
      logo: DataTypes.STRING,
      name: DataTypes.STRING,
      subscription_type: DataTypes.ENUM(["limited", "unlimited"]),
    },
    {
      sequelize,
      modelName: "Company",
    }
  );
  return Company;
};
