"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Paket_type_price extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Paket_type_price.belongsTo(models.Paket, {
        foreignKey: "paket_id",
      });
      Paket_type_price.belongsTo(models.Paket_type, {
        foreignKey: "paket_type_id",
      });
      Paket_type_price.belongsTo(models.Company, {
        foreignKey: "company_id",
      });
    }
  }
  Paket_type_price.init(
    {
      company_id: DataTypes.INTEGER,
      paket_id: DataTypes.INTEGER,
      paket_type_id: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Paket_type_price",
    }
  );
  return Paket_type_price;
};
