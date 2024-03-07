'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class List extends Model {
    static associate(models) {
      // Define associations here, if any
    }
  }

  List.init({
    list_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    list_title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    board_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    created: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updated: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    user_id: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'List',
    timestamps: false,
    tableName: 'lists'
  });

  return List;
};
