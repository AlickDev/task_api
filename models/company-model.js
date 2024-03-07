'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Company extends Model {
    static associate(models) {
      // Define associations here, if any
    }
  }

  Company.init({
    com_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    com_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    com_logo: {
      type: DataTypes.STRING
    },
    com_active: {
      type: DataTypes.INTEGER,
      defaultValue: true
    },
    created: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updated: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'Company',
    timestamps: false,
    tableName: 'companies'
  });

  return Company;
};
