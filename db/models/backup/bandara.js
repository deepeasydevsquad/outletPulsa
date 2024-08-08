"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Bandara extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Bandara.belongsTo(models.Company, {
        foreignKey: "company_id",
      });
      Bandara.belongsTo(models.City, {
        foreignKey: "city_id",
      });
      Bandara.hasMany(models.Itinerary, {
        foreignKey: "bandara_id_from",
      });
      Bandara.hasMany(models.Itinerary, {
        foreignKey: "bandara_id_destination",
      });
    }
  }
  Bandara.init(
    {
      company_id: DataTypes.INTEGER,
      name: DataTypes.STRING,
      city_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Bandara",
    }
  );
  return Bandara;
};
