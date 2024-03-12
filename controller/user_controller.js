const log4js = require("log4js");
const config = require("../function/logger");
const userRepo = require("../repository/user_repo");

log4js.configure(config);
const logger = log4js.getLogger("userActivity");

exports.getUser = async (req, res, next) => {
  try {
    console.log(req.user)
    const users = await userRepo.getUsers();

    logger.info("Successfully retrieved users", req.ip);

    res.status(200).json({
      message: "Success retrieved users",
      data: users,
    });
  } catch (error) {
    logger.error("Error retrieving users:", error);
    res.status(500).json({ error: "Internal Server Error" });
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

    await userRepo.createUser(newUserData);
    res.status(201).send({
      message: "User created",
    });
  } catch (error) {
    logger.error("Error retrieving users:", error);
    res.status(500).json({ message: "Internal Server Error", error:error.message});
  }
};
