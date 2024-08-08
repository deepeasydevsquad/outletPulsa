"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Secondary_akun extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Secondary_akun.belongsTo(models.Company, {
        foreignKey: "company_id",
      });
      Secondary_akun.belongsTo(models.Primary_akun, {
        foreignKey: "primary_akun_id",
      });
    }
  }
  Secondary_akun.init(
    {
      company_id: DataTypes.INTEGER,
      primary_akun_id: DataTypes.INTEGER,
      secondary_account_number: DataTypes.INTEGER,
      name: DataTypes.STRING,
      path: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Secondary_akun",
    }
  );
  return Secondary_akun;
};
