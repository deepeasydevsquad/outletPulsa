"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaction_deposit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction_deposit.belongsTo(models.Transaction, {
        foreignKey: "transaction_id",
      });
    }
  }
  Transaction_deposit.init(
    {
      transaction_id: DataTypes.INTEGER,
      nominal: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Transaction_deposit",
    }
  );
  return Transaction_deposit;
};
