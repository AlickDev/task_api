'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Role extends Model {
    static associate(models) {
      // Define associations here, if any
    }
  }

  Role.init({
    role_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    role_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    created: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'Role',
    timestamps: false,
    tableName: 'roles'
  });

  return Role;
};
