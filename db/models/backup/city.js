"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class City extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      City.belongsTo(models.Company, {
        foreignKey: "company_id",
      });
      City.hasMany(models.Hotel, {
        foreignKey: "city_id",
      });
      City.hasMany(models.Bandara, {
        foreignKey: "city_id",
      });
      City.hasMany(models.Itinerary, {
        foreignKey: "city_id_from",
      });
      City.hasMany(models.Itinerary, {
        foreignKey: "city_id_destination",
      });
    }
  }
  City.init(
    {
      company_id: DataTypes.INTEGER,
      name: DataTypes.STRING,
      code: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "City",
    }
  );
  return City;
};
