"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Visa_request_type extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Visa_request_type.hasMany(models.Visa_transaction_detail, {
        foreignKey: "visa_request_type_id",
      });
    }
  }
  Visa_request_type.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Visa_request_type",
    }
  );
  return Visa_request_type;
};
