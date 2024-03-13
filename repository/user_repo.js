const bcrypt = require("bcryptjs");
const model = require("../models/index");
const { User, sequelize } = model;

module.exports = {
  async getUsers(userId, comId) {
    try {
      const query = ` SELECT u.user_id, u.first_name, u.last_name, u.avatar, u.email, u.active, u.group_id, u.role_id,u.updated, ug.group_name, r.role_name, c.com_name, creator.user_id AS creator_id, creator.first_name AS creator_first_name, creator.last_name AS creator_last_name, creator.avatar AS creator_avatar FROM users AS u JOIN user_groups AS ug ON u.group_id = ug.group_id JOIN roles AS r ON u.role_id = r.role_id JOIN companies AS c ON u.com_id = c.com_id JOIN users AS creator ON u.create_by = creator.user_id
       WHERE u.com_id = :comId AND u.user_id <> :userId`;
      const [users, metadata] = await sequelize.query(query, {
        replacements: { userId, comId },
        type: sequelize.QueryTypes.SELECT,
      });
      if (users === undefined || users.length === 0) {
        throw new Error("No data");
      }

      return users;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  },

  async createUser(userData) {
    try {
      const exitEmail = await User.findOne({
        where: { email: userData.email },
      });

      if (exitEmail) {
        throw new Error("Email is already in use");
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(userData.password, salt);

      await User.create({
        first_name: userData.first_name,
        last_name: userData.last_name,
        avatar: userData.avatar,
        email: userData.email,
        password: hashedPassword,
        active: userData.active || 1,
        create_by: userData.create_by,
        group_id: userData.group_id,
        com_id: userData.com_id,
        is_workspace: userData.is_workspace || 0,
        role_id: userData.role_id,
      });
      return true;
    } catch (error) {
      throw error;
    }
  },

  async updateUser(userId, updateUserData) {
    const userData = await User.findByPk(userId);

    if (!userData) {
      throw new Error("User not found");
    }

    //  update user
    userData.first_name = updateUserData.first_name || userData.first_name;
    userData.last_name = updateUserData.last_name || userData.last_name;
    userData.avatar = updateUserData.avatar || userData.avatar;
    userData.active = updateUserData.active || userData.active;
    userData.group_id = updateUserData.group_id || userData.group_id;
    userData.role_id = updateUserData.role_id || userData.role_id;
    userData.refresh_token = null;
    userData.updated = Date.now();

    await userData.save();

    return userData;
  },

  async deleteUser(userId, com_id) {
    try {
      const user = await User.findOne({
        where: { user_id: userId, com_id: com_id },
      });
      if (!user) {
        throw new Error("User not found");
      }

      if (user.com_id !== com_id) {
        throw new Error("Not permission");
      }
      await user.destroy();
      return true;
    } catch (error) {
      throw error;
    }
  },

  async findById(userId, comId) {
    try {
      // const query = ` SELECT u.user_id, u.first_name, u.last_name, u.avatar, u.email, u.active, u.group_id, u.role_id,u.updated, ug.group_name, r.role_name, c.com_name, creator.user_id AS creator_id, creator.first_name AS creator_first_name, creator.last_name AS creator_last_name, creator.avatar AS creator_avatar FROM users AS u JOIN user_groups AS ug ON u.group_id = ug.group_id JOIN roles AS r ON u.role_id = r.role_id JOIN companies AS c ON u.com_id = c.com_id JOIN users AS creator ON u.create_by = creator.user_id WHERE users.user_id = :userId AND users.com_id = :comId;`;
      const query = `SELECT u.user_id, u.first_name, u.last_name, u.avatar, u.email, u.active, u.group_id, u.role_id, u.updated, ug.group_name, r.role_name, c.com_name, creator.user_id AS creator_id, creator.first_name AS creator_first_name, creator.last_name AS creator_last_name, creator.avatar AS creator_avatar FROM users AS u JOIN user_groups AS ug ON u.group_id = ug.group_id JOIN roles AS r ON u.role_id = r.role_id JOIN companies AS c ON u.com_id = c.com_id JOIN users AS creator ON u.create_by = creator.user_id WHERE u.user_id = :userId AND u.com_id = :comId`;
      const [user, metadata] = await sequelize.query(query, {
        replacements: { userId, comId },
        type: sequelize.QueryTypes.SELECT,
      });

      if (!user) {
        throw new Error("User not found");
      }

      return user;
    } catch (error) {
      throw error;
    }
  },

  //--------------- Private system-------------
  async userCheck(userId, comId) {
    try {
      const query = ` SELECT users.role_id  FROM users JOIN companies ON users.com_id = companies.com_id WHERE users.user_id = :userId AND users.com_id = :comId  AND users.active = 1 AND companies.com_active = 1;`;
      const [user, metadata] = await sequelize.query(query, {
        replacements: { userId, comId },
        type: sequelize.QueryTypes.SELECT,
      });

      return user;
    } catch (error) {
      throw error;
    }
  },
};
