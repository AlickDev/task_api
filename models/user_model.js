const { Sequelize, Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class User extends Model {
    static init(sequelize) {
      super.init(
        {
          user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          email: DataTypes.STRING,
          password: DataTypes.STRING,
          role_id: DataTypes.INTEGER,
          enable: DataTypes.BOOLEAN,
          last_login: DataTypes.DATE,
          firstName: DataTypes.STRING,
          lastName: DataTypes.STRING,
          phone: DataTypes.STRING,
          refresh_token: DataTypes.STRING,
          createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
          },
          createdBy: DataTypes.STRING,
        },
        {
          sequelize,
          modelName: 'User',
          timestamps: false,
          tableName: 'User',
        }
      );
    }
  }

  return User;
};
