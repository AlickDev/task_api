'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Card extends Model {
    static associate(models) {
      // Define associations here, if any
    }
  }

  Card.init({
    card_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING
    },
    list_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    parent_card_id: {
      type: DataTypes.INTEGER
    },
    start_date: {
      type: DataTypes.DATE
    },
    due_date: {
      type: DataTypes.DATE
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
    modelName: 'Card',
    timestamps: false, 
    tableName: 'cards'
  });

  return Card;
};
