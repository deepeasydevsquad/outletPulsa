"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Airlines extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Airlines.belongsTo(models.Company, {
        foreignKey: "company_id",
      });
      Airlines.hasMany(models.Itinerary, {
        foreignKey: "airplane_id",
      });
    }
  }
  Airlines.init(
    {
      company_id: DataTypes.INTEGER,
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Airlines",
    }
  );
  return Airlines;
};
