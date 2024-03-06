const log4js = require('log4js');
const config = require('../function/logger');
const userRepo = require('../repository/user_repo')

log4js.configure(config);
const logger = log4js.getLogger("User");

exports.getUser = async (req, res, next) => {
    try {

        const users = await userRepo.getUser()

        logger.info("Successfully retrieved users",req.ip);

        res.status(200).json(users);
    } catch (error) {
        logger.error("Error retrieving users:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
