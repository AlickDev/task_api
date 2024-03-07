'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Assignment extends Model {
    static associate(models) {
      // Define associations here, if any
    }
  }

  Assignment.init({
    assign_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    card_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    create_by: {
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
    modelName: 'Assignment',
    timestamps: false, 
    tableName: 'assignments'
  });

  return Assignment;
};
