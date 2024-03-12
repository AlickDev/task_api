const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const model = require('../models/index');
const { User, Company, LoginHistory, Role } = model;


module.exports = {
    async loginUser(email, password, latitude, longitude, device_name, ip_address) {
        const user = await User.findOne({where:{ email: email }});
        if (!user) {
            throw new Error('Invalid username or password');
        }
        // Check if user is active and not a workspace
        if (user.active !== 1 || user.is_workspace !== 0) {
            throw new Error('User is not active or is a workspace');
        }
        // Check if company associated with the user is active
        const company = await Company.findOne({ where: { com_id: user.com_id } });
        if (!company || company.com_active !== 1) {
            throw new Error('Company is not active');
        }
        // Validate password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Invalid username or password');
        }

        // Generate JWT tokens
        const accessToken = jwt.sign(
            {
                user_id: user.user_id,
                email: user.email,
                com_id: user.com_id,
                role_id: user.role_id
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        const refreshToken = jwt.sign(
            { user_id: user.user_id },
            process.env.JWT_REFRESH_SECRET,
            { expiresIn: '1d' }
        );

        // Save refresh token in the database
        user.refresh_token = refreshToken;
        await user.save();

        // Save login history
        await LoginHistory.create({
            user_id: user.user_id,
            latitude,
            longitude,
            device_name,
            ip_address
        });
        // find role info
        const roleInfo = await Role.findByPk(user.role_id);

        // show data user profile
        const userInfo = {
            user_id: user.user_id,
            first_name: user.first_name,
            last_name: user.last_name,
            avatar: user.avatar,
            role: user.role,
            role: roleInfo.role_name
        }


        return { accessToken, refreshToken, userInfo };

    },

    async refreshToken(refreshToken) {
        try {
            // Verify refresh token
            const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

            // Find user by user_id
            const user = await User.findOne({
                where: {
                    user_id: decoded.user_id
                }
            });

            // Check if user exists and refresh token matches
            if (!user || user.refresh_token !== refreshToken || user.active !== 1) {
                throw new Error('Invalid refresh token');
            }

            // Check if company associated with the user is active
            const company = await Company.findOne({ where: { com_id: user.com_id } });
            if (!company || company.com_active !== 1) {
                throw new Error('Company is not active');
            }

            // Generate new access token
            const newAccessToken = jwt.sign(
                { user_id: user.user_id, email: user.email },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            // Generate new refresh token
            const newRefreshToken = jwt.sign(
                { user_id: user.user_id },
                process.env.JWT_REFRESH_SECRET,
                { expiresIn: '1d' }
            );

            // Save new refresh token in the database
            user.refresh_token = newRefreshToken;
            await user.save();


            return { newAccessToken, newRefreshToken };
        } catch (error) {
            throw error;
        }
    },

    async logout(accessToken) {
        try {
            // Decode access token to get user_id
            const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
            const userId = decoded.user_id;

            // Find user by user_id
            const user = await User.findByPk(userId);

            // Check if user exists and access token matches
            if (!user || user.refresh_token === null) {
                throw new Error('Invalid access token');
            }

            // Remove refresh token from the database
            user.refresh_token = null;
            await user.save();

            return true;
        } catch (error) {
            throw error;
        }
    },

    async getUsers() {
        try {
            const users = await User.findAll();
            return users;
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error;
        }
    },

};
