"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Company_administrator extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Company_administrator.belongsTo(models.Company, {
        foreignKey: "company_id",
      });
    }
  }
  Company_administrator.init(
    {
      code: DataTypes.STRING,
      company_id: DataTypes.INTEGER,
      username: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Company_administrator",
    }
  );
  return Company_administrator;
};
