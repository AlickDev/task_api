const express = require('express')
const router = express.Router();

const {auth, isAdmin} = require('../../middlewares/auth');
const {insertGroup, getGroupUser} = require ('../../controller/user-group-controller');

router.post('/group',[auth],insertGroup);
router.get('/group',[auth],getGroupUser);

module.exports = router;