const express = require('express')
const router = express.Router()


const { getUser } = require('../controller/user_controller');

router.get('/user',getUser );

module.exports = router;
