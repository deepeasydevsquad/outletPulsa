"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Setting_company extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Setting_company.belongsTo(models.Company, {
        foreignKey: "company_id",
      });
    }
  }
  Setting_company.init(
    {
      company_id: DataTypes.INTEGER,
      img_header_invoice: DataTypes.STRING,
      header_invoice: DataTypes.STRING,
      nama_kota: DataTypes.STRING,
      telp: DataTypes.STRING,
      whatsapp: DataTypes.STRING,
      pos_code: DataTypes.STRING,
      email_invoice: DataTypes.STRING,
      address_invoice: DataTypes.STRING,
      note_invoice: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Setting_company",
    }
  );
  return Setting_company;
};
