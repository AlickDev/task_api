const log4js = require("log4js");
const config = require("../function/logger");
const groupUserRepo = require("../repository/user-group-repo");


exports.insertGroup = async (req, res, next) => {
  try {
    const { user_id, com_id } = req.user;
    const { group_name, description } = req.body;

    if (!group_name) {
      return res.status(400).json({ error: "Invalid group name" });
    }
    await groupUserRepo.insertGroup(group_name, description, com_id);

    res.status(200).json({
      message: "User-Group created successfully",
    });
  } catch (error) {
    if (error.message === "exitName") {
      res.status(400).json({ error: "exitName." });
    } else {
      console.error("Error inserting user-group association:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

exports.getGroupUser = async (req, res, next) => {
  try {
    const { user_id, com_id } = req.user;
    const groups = await groupUserRepo.getGroups(com_id);

    res.status(200).json({
      message: "Get groups",
      data: groups
    })
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateGroup = async (req, res, next) => {
  try {
    const { user_id, com_id } = req.user;
    const { group_name, description } = req.body;
    const { id } = req.params;


    await groupUserRepo.updateGroup(id, group_name, description, com_id);
    res.status(200).json({
      message: 'Group updated successfully'
    });
  } catch (error) {
    if (error.message === "Group not found") {
      res.status(404).json({ error: "Group not found." });
    } else if (error.message === "Group name already exists") {
      res.status(400).json({ error: "Group name already exists." });
    } else {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
};

exports.deleteGroup = async (req, res, next) => {
  try {
    const { user_id, com_id } = req.user;
    const { id } = req.params;

    const group = await groupUserRepo.deleteGroup(id, user_id);

    res.status(200).json({
      message: 'Group deleted successfully'
    });
  } catch (error) {
    if (error.message === "Group not found") {
      res.status(404).json({ error: "Group not found." });
    } else {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
}
