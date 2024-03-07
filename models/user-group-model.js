'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class UserGroup extends Model {
    static associate(models) {
      // Define associations here, if any
    }
  }

  UserGroup.init({
    group_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    group_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING
    },
    com_id: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'UserGroup',
    timestamps: false,
    tableName: 'user_groups'
  });

  return UserGroup;
};
