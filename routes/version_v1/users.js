const express = require('express')
const router = express.Router()


const { getUsers, createUser, updateUser, deleteUser, findById } = require('../../controller/user_controller');
const {auth, isAdmin} = require('../../middlewares/auth')

router.get('/user',[auth, isAdmin], getUsers );
router.post('/user',auth, createUser );
router.put('/user/:userId',auth, updateUser );
router.delete('/user/:id',auth, deleteUser );
router.get('/user/:id',auth, findById );

module.exports = router;
