const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const model = require('../models/index');
const { User } = model;


module.exports = {

    async getUsers() {
        try {
            const users = await User.findAll();
            return users;
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error;
        }
    },

    async insertUser(userData) {
        try {

        } catch (error) {
            throw error
        }
    }

};
