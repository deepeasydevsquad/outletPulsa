"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cabang extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cabang.belongsTo(models.Company, {
        foreignKey: "company_id",
      });
      Cabang.hasMany(models.Group_access, {
        foreignKey: "cabang_id",
      });
    }
  }
  Cabang.init(
    {
      company_id: DataTypes.INTEGER,
      name: DataTypes.STRING,
      type: DataTypes.ENUM(["pusat", "cabang"]),
      city: DataTypes.STRING,
      address: DataTypes.STRING,
      pos_code: DataTypes.STRING,
      telp: DataTypes.STRING,
      whatsapp_number: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Cabang",
    }
  );
  return Cabang;
};
