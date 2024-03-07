'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class User extends Model {
    static associate(models) {
      // Define associations here, if any
    }
  }

  User.init({
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    avatar: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    active: {
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
    },
    refresh_token: {
      type: DataTypes.STRING
    },
    create_by: {
      type: DataTypes.INTEGER
    },
    group_id: {
      type: DataTypes.INTEGER
    },
    com_id: {
      type: DataTypes.INTEGER
    },
    is_workspace: {
      type: DataTypes.INTEGER
    },
    role_id: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'User',
    timestamps: false,
    tableName: 'users'
  });

  return User;
};
