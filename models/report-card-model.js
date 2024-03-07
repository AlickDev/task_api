'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Report extends Model {
    static associate(models) {
      // Define associations here, if any
    }
  }

  Report.init({
    report_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    report_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING
    },
    file_url: {
      type: DataTypes.STRING
    },
    card_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    report_type: {
      type: DataTypes.STRING
    },
    created: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updated: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    lat: {
      type: DataTypes.DOUBLE
    },
    log: {
      type: DataTypes.DOUBLE
    }
  }, {
    sequelize,
    modelName: 'Report',
    timestamps: false,
    tableName: 'reports'
  });

  return Report;
};
