"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Itinerary extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Itinerary.belongsTo(models.Company, {
        foreignKey: "company_id",
      });
      Itinerary.belongsTo(models.Paket, {
        foreignKey: "paket_id",
      });
      Itinerary.belongsTo(models.City, {
        foreignKey: "city_id_from",
      });
      Itinerary.belongsTo(models.City, {
        foreignKey: "city_id_destination",
      });
      Itinerary.belongsTo(models.Car, {
        foreignKey: "car_id",
      });
      Itinerary.belongsTo(models.Airlines, {
        foreignKey: "airplane_id",
      });
      Itinerary.belongsTo(models.Bandara, {
        foreignKey: "bandara_id_from",
      });
      Itinerary.belongsTo(models.Bandara, {
        foreignKey: "bandara_id_destination",
      });
      Itinerary.belongsTo(models.Hotel, {
        foreignKey: "hotel_id_from",
      });
      Itinerary.belongsTo(models.Hotel, {
        foreignKey: "hotel_id_destination",
      });
    }
  }
  Itinerary.init(
    {
      company_id: DataTypes.INTEGER,
      paket_id: DataTypes.INTEGER,
      city_id_from: DataTypes.INTEGER,
      city_id_destination: DataTypes.INTEGER,
      kendaraan: DataTypes.ENUM(["car", "airplane"]),
      car_id: DataTypes.INTEGER,
      airplane_id: DataTypes.INTEGER,
      bandara_id_from: DataTypes.INTEGER,
      bandara_id_destination: DataTypes.INTEGER,
      departure_date: DataTypes.DATEONLY,
      arrival_date: DataTypes.DATEONLY,
      hotel_id_from: DataTypes.INTEGER,
      hotel_id_destination: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Itinerary",
    }
  );
  return Itinerary;
};
