const express = require('express');
const registerController= require('../controller/registerController/registerController');
const loginController = require('../controller/loginController/loginController');
const router = express.Router();
const {MakePayment} = require('../utility/stripe/stripeConfig')

router.get('/allusers', registerController.getAllUsers);

router.post('/user', registerController.registerUser);

router.get('/verifymail', registerController.verifyMail);


router.post('/login', loginController.loginUser);

router.post('/makepayment', MakePayment);


module.exports = router;