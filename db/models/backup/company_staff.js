"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Company_staff extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Company_staff.belongsTo(models.Company, {
        foreignKey: "company_id",
      });
      Company_staff.hasMany(models.System_log, {
        foreignKey: "user_id",
      });
      Company_staff.belongsTo(models.Group_access, {
        foreignKey: "group_access_id",
      });
    }
  }
  Company_staff.init(
    {
      code: DataTypes.STRING,
      company_id: DataTypes.INTEGER,
      fullname: DataTypes.STRING,
      whatsapp: DataTypes.STRING,
      group_access_id: DataTypes.INTEGER,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Company_staff",
    }
  );
  return Company_staff;
};
