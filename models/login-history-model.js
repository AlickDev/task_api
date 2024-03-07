'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class LoginHistory extends Model {
    static associate(models) {
      // Define associations here, if any
    }
  }

  LoginHistory.init({
    login_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    login_time: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    latitude: {
      type: DataTypes.DOUBLE
    },
    longitude: {
      type: DataTypes.DOUBLE
    },
    device_name: {
      type: DataTypes.STRING
    },
    ip_address: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'LoginHistory',
    timestamps: false,
    tableName: 'login_history'
  });

  return LoginHistory;
};
