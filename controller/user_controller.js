const log4js = require('log4js');
const config = require('../function/logger');
const userRepo = require('../repository/user_repo')

log4js.configure(config);
const logger = log4js.getLogger("User");

exports.getUser = async (req, res, next) => {
    try {

        const users = await userRepo.getUsers();

        logger.info("Successfully retrieved users", req.ip);

        res.status(200).json({
            message: "Success retrieved users",
            data: users
        });
    } catch (error) {
        logger.error("Error retrieving users:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.login = async (req, res, next) => {
    try {

        const { email, password } = req.body;
        const login = await userRepo.loginUser(email, password, 1, 1);
        res.status(200).json({
            message: "login successful",
            data: login
        });

    } catch (error) {
        if (error.message === 'Invalid username or password') {
            res.status(400).json({ error: 'Invalid username or password' });
        } else if (error.message === 'User is not active or is a workspace' || error.message === 'Company is not active') {
            res.status(403).json({ error: error.message });
        } else {
            console.error('Error retrieving users:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};

exports.refreshToken = async (req, res, next) => {
    try {
        const { refreshToken } = req.body;
        const accessToken = await userRepo.refreshToken(refreshToken);
        res.status(200).json({
            message: 'Access token',
            data: accessToken
        });
    } catch (error) {
        console.error('Error refreshing token:', error);
        res.status(500).json({ error: error.message });
    }
};
