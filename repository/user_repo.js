const model = require('../models/index');
const { sequelize } = model;



module.exports = {
    async getUser () {
        // Execute raw SQL query
        const users = await sequelize.query("SELECT * FROM `User`", { type: sequelize.QueryTypes.SELECT });
        return users;
    },
};

