"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Paket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Paket.belongsTo(models.Company, {
        foreignKey: "company_id",
      });
      Paket.hasMany(models.Tabungan_umrah, {
        foreignKey: "target_paket_id",
      });
      Paket.hasMany(models.Paket_type_price, {
        foreignKey: "paket_id",
      });
    }
  }
  Paket.init(
    {
      company_id: DataTypes.INTEGER,
      activity_type: DataTypes.ENUM(["haji", "umrah"]),
      code: DataTypes.STRING,
      photo: DataTypes.STRING,
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      departure_date: DataTypes.DATEONLY,
      return_date: DataTypes.DATEONLY,
      quota: DataTypes.INTEGER,
      facilities: DataTypes.TEXT,
      paket_status: DataTypes.ENUM(["buka", "tutup"]),
    },
    {
      sequelize,
      modelName: "Paket",
    }
  );
  return Paket;
};
