"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Penyakit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Penyakit.belongsTo(models.Company, {
        foreignKey: "company_id",
      });
      Penyakit.hasMany(models.Riwayat_penyakit, {
        foreignKey: "penyakit_id",
      });
    }
  }
  Penyakit.init(
    {
      company_id: DataTypes.INTEGER,
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Penyakit",
    }
  );
  return Penyakit;
};
