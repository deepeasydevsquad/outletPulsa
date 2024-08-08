"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Profession extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Profession.belongsTo(models.Company, {
        foreignKey: "company_id",
      });
      Profession.hasMany(models.Jamaah, {
        foreignKey: "profession_id",
      });
    }
  }
  Profession.init(
    {
      company_id: DataTypes.INTEGER,
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Profession",
    }
  );
  return Profession;
};
