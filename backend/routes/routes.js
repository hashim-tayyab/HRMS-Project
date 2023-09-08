const express = require('express');
const registerController= require('../controller/registerController/registerController');
const loginController = require('../controller/loginController/loginController');
const employeeController = require('../controller/employeeController/employeeController');
const router = express.Router();
const {MakePayment} = require('../utility/stripe/stripeConfig')


//Register Routes
router.get('/allusers', registerController.getAllUsers);
router.post('/user', registerController.registerUser);
router.get('/verifymail', registerController.verifyMail);


//Login Routes
router.post('/login', loginController.loginUser);
router.get('/getuser/:userId', loginController.getUserById);


//Employee Routes
router.post('/addemployee', employeeController.addEmployee);
router.get('/getemployees', employeeController.getEmployeesList);


//Payment Routes
router.post('/makepayment', MakePayment);


module.exports = router;