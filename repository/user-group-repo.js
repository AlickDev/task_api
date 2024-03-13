const model = require("../models/index");
const { UserGroup } = model;

model.exports = {
  async insertGroup(name, description, com_id) {
    try {
      const exitName = await UserGroup.findOne({
        where: { group_name: name, com_id: com_id },
      });
      if (exitName) {
        throw new Error("exitName")
      }
    } catch (error) {
      throw error;
    }
  },
};
