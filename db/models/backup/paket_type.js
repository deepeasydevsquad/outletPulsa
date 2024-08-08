"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Paket_type extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Paket_type.belongsTo(models.Company, {
        foreignKey: "company_id",
      });
      Paket_type.hasMany(models.Paket_type_price, {
        foreignKey: "paket_type_id",
      });
    }
  }
  Paket_type.init(
    {
      company_id: DataTypes.INTEGER,
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Paket_type",
    }
  );
  return Paket_type;
};
