"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Hotel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Hotel.belongsTo(models.Company, {
        foreignKey: "company_id",
      });
      Hotel.belongsTo(models.City, {
        foreignKey: "city_id",
      });
      Hotel.hasMany(models.Itinerary, {
        foreignKey: "hotel_id_from",
      });
      Hotel.hasMany(models.Itinerary, {
        foreignKey: "hotel_id_destination",
      });
    }
  }
  Hotel.init(
    {
      company_id: DataTypes.INTEGER,
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      star: DataTypes.INTEGER,
      city_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Hotel",
    }
  );
  return Hotel;
};
