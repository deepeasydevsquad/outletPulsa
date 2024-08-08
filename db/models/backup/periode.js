"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Periode extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Periode.belongsTo(models.Company, {
        foreignKey: "company_id",
      });
      Periode.hasMany(models.Periode, {
        foreignKey: "company_id",
      });
    }
  }
  Periode.init(
    {
      company_id: DataTypes.INTEGER,
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Periode",
    }
  );
  return Periode;
};
