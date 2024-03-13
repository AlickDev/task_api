const log4js = require("log4js");
const config = require("../function/logger");
const userRepo = require("../repository/user_repo");

log4js.configure(config);
const logger = log4js.getLogger("userActivity");

exports.getUsers = async (req, res, next) => {
  try {
    const { user_id, com_id } = req.user;
    const users = await userRepo.getUsers(user_id, com_id);

    logger.info("Successfully retrieved users", req.ip);

    res.status(200).json({
      message: "Success retrieved users",
      data: users,
    });
  } catch (error) {
    if (error.message === "No data") {
      res.status(200).json({ message: "Success retrieved users (No data).",data:[] });
    } else {
    logger.error("Error retrieving users:", error);
    res.status(500).json({ error: "Internal Server Error" })};
  }
};

exports.createUser = async (req, res, next) => {
  try {
    const { user_id, com_id } = req.user;
    const {
      first_name,
      last_name,
      avatar,
      email,
      password,
      active,
      group_id,
      is_workspace,
      role_id,
    } = req.body;

    if (!first_name || !first_name || !email || !password || !role_id) {
      return res.status(400).json({ error: "Invalid data" });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    // Validate password length and format
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        error:
          "Password must be at least 6 characters long and contain at least one letter and one number",
      });
    }

    const newUserData = {
      first_name: first_name,
      last_name: last_name,
      avatar: avatar,
      email: email,
      password: password,
      active: active || 1,
      create_by: user_id,
      group_id: group_id,
      com_id: com_id,
      is_workspace: is_workspace || 0,
      role_id: role_id,
    };

    const newuser = await userRepo.createUser(newUserData);
    res.status(201).send({
      message: "User created",
    });
    logger.info("Create new user", "new user id:", newuser.user_id, req.ip);
  } catch (error) {
    logger.error("Error retrieving users:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    // Check if userId is not a valid integer
    if (!Number.isInteger(Number(userId))) {
      return res.status(400).json({ error: "userId must be an integer" });
    }

    const { first_name, last_name, avatar, active, group_id, role_id } =
      req.body;
    const updatedUserData = {
      first_name: first_name,
      last_name: last_name,
      avatar: avatar,
      active: active,
      group_id: group_id,
      role_id: role_id,
    };

    await userRepo.updateUser(userId, updatedUserData);
    res.status(200).json({
      message: "User updated successfully",
    });
  } catch (error) {
    if (error.message === "User not found") {
      res.status(404).json({ error: "User not found" });
    } else {
      console.error("Error updating user:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    // Check if userId is not a valid integer
    if (!Number.isInteger(Number(userId))) {
      return res.status(400).json({ error: "userId must be an integer" });
    }

    const { user_id, com_id } = req.user;
    await userRepo.deleteUser(userId, com_id);

    res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    if (error.message === "User not found") {
      res.status(404).json({ error: "User not found" });
    } else if (error.message === "Not permission") {
      res.status(400).json({ error: "Not permission" });
    } else {
      console.error("Error deleting user:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

exports.findById = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const { user_id, com_id } = req.user;
    // Check if userId is not a valid integer
    if (!Number.isInteger(Number(userId))) {
      return res.status(400).json({ error: "userId must be an integer" });
    }

    const user = await userRepo.findById(userId, com_id);
    res.status(200).json({
      message: "Get user successfully",
      data: user,
    });
  } catch (error) {
    if (error.message === "User not found") {
      res.status(404).json({ error: "User not found" });
    } else {
      console.error("Error deleting user:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};
