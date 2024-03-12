const express = require('express')
const router = express.Router()


const { getUser, createUser } = require('../../controller/user_controller');
const {auth} = require('../../middlewares/auth')

router.get('/user',auth, getUser );
router.post('/user',auth, createUser );

module.exports = router;
