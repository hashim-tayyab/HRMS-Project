const express = require('express');
const registerController= require('../controller/registerController/registerController');
const router = express.Router();


router.get('/allusers', registerController.getAllUsers);

router.post('/user', registerController.registerUser);

router.get('/verifymail', registerController.verifyMail);

module.exports = router;