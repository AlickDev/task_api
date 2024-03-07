'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Board extends Model {
    static associate(models) {
      // Define associations here, if any
    }
  }

  Board.init({
    board_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    project_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    board_title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    board_description: {
      type: DataTypes.STRING
    },
    create_by: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    com_id: {
      type: DataTypes.INTEGER,
      allowNull: false
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
    modelName: 'Board',
    timestamps: false,
    tableName: 'boards'
  });

  return Board;
};
