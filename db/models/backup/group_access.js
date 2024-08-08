"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Group_access extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Group_access.belongsTo(models.Cabang, {
        foreignKey: "cabang_id",
      });
      Group_access.hasMany(models.Company_staff, {
        foreignKey: "group_access_id",
      });
    }
  }
  Group_access.init(
    {
      name: DataTypes.STRING,
      cabang_id: DataTypes.INTEGER,
      tab_access: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Group_access",
    }
  );
  return Group_access;
};
