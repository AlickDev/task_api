const model = require("../models/index");
const { UserGroup } = model;

module.exports  = {
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

  async getGroups(com_id) {
    const groups = await UserGroup.findAll({
      attributes: ["group_id ", "group_name", "description"],
      where: { com_id: com_id },
    });

    return groups;
  },
};
