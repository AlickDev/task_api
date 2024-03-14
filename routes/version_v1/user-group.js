const express = require('express')
const router = express.Router();

const {auth, isAdmin} = require('../../middlewares/auth');
const {insertGroup, getGroupUser, updateGroup, deleteGroup} = require ('../../controller/user-group-controller');

router.post('/group',auth, insertGroup);
router.get('/group',auth, getGroupUser);
router.put('/group/:id',auth, updateGroup);
router.delete('/group/:id',auth, deleteGroup);

module.exports = router;
