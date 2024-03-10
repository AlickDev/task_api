const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const model = require("../models/index");
const { User } = model;

module.exports = {
  async getUsers() {
    try {
      const users = await User.findAll();
      return users;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  },

  // find user by id
  async findUserById(user_id) {
    try {
      const user = await User.findById(user_id);
      return user;
    } catch (error) {
      throw error;
    }
  },

  async createUser(userData) {
    try {
      const exitEmail = await User.findOne({ email: userData.email });
      if (exitEmail) {
        throw new Error("Email is already in use");
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(userData.password, salt);

      const newUser = await User.create({
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
        role_id: userData.role,
      });
      return true;
    } catch (error) {
      throw error;
    }
  },
};
