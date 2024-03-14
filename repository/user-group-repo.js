const model = require("../models/index");
const { UserGroup, User } = model;

module.exports = {
  async insertGroup(name, description, com_id) {
    try {
      const exitName = await UserGroup.findOne({
        where: { group_name: name, com_id: com_id },
      });
      if (exitName) {
        throw new Error("exitName");
      }

      const newGroup = await UserGroup.create({
        group_name: name,
        description: description,
        com_id: com_id,
      });
      return newGroup;
    } catch (error) {
      throw error;
    }
  },

  async updateGroup(groupId, name, description, comId) {
    const group = await UserGroup.findByPk(comId);

    if (!group) {
      throw new Error('Group not found');
    };
    const existingGroup = await UserGroup.findOne({
      where: { group_name: name, com_id: comId },
    });
    if (existingGroup && existingGroup.group_id !== groupId) {
      throw new Error('Group name already exists');
    };

    group.group_name = name;
    group.description = description;

    await group.save();
    return group;
  },

  async getGroups(com_id) {
    try {
      const groups = await UserGroup.findAll({
        where: { com_id: com_id },
        attributes: ['group_id', 'group_name', 'description'],
      });

      return groups;
    } catch (error) {
      throw error;
    }
  },

  async deleteGroup(groupId, com_id) {
    try {
      const group = await UserGroup.findByPk(groupId);

      if (!group) {
        throw new Error('Group not found');
      };
      const users = await User.findAll({ where: { group_id: groupId, com_id: com_id } });
      // Update the group_id of each user to null
      for (const user of users) {
        user.group_id = null;
        await user.save();
      };

      await group.destroy();
    } catch (error) {
      throw error;
    }

  },
};
