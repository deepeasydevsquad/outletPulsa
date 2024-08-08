"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Riwayat_penyakit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Riwayat_penyakit.belongsTo(models.Company, {
        foreignKey: "company_id",
      });
      Riwayat_penyakit.belongsTo(models.Penyakit, {
        foreignKey: "penyakit_id",
      });
      Riwayat_penyakit.belongsTo(models.Jamaah, {
        foreignKey: "jamaah_id",
      });
    }
  }
  Riwayat_penyakit.init(
    {
      company_id: DataTypes.INTEGER,
      penyakit_id: DataTypes.INTEGER,
      jamaah_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Riwayat_penyakit",
    }
  );
  return Riwayat_penyakit;
};
