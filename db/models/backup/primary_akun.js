"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Primary_akun extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Primary_akun.hasMany(models.Secondary_akun, {
        foreignKey: "primary_akun_id",
      });
    }
  }
  Primary_akun.init(
    {
      account_number: DataTypes.INTEGER,
      name: DataTypes.STRING,
      sn: DataTypes.STRING,
      pos: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Primary_akun",
    }
  );
  return Primary_akun;
};
