const express = require('express')
const router = express.Router()


const {login,refreshToken,logout } = require('../../controller/auth-controller');

router.post('/login',login );
router.post('/refreshToken',refreshToken );
router.post('/logout',logout );

module.exports = router;
