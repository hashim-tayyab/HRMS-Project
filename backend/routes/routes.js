const express = require('express');
const registerController= require('../controller/registerController/registerController');
const loginController = require('../controller/loginController/loginController');
const employeeController = require('../controller/employeeController/employeeController');
const paymentController = require('../controller/paymentController/paymentController');
const attendanceController = require('../controller/attendanceController/attendanceController');
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
router.get('/getmyemployees/:manager', employeeController.getMyAddedEmployees);
router.post('/loginemployee', employeeController.loginAsEmployee);
router.get('/employee/:userId', employeeController.getEmployeeById);


//Attendant Routes
router.post('/addcheckin/:userId', attendanceController.addCheckInTime);
router.post('/addcheckout/:userId', attendanceController.addCheckOutTime);



//Payment Routes
router.post('/makepayment', MakePayment);
router.get('/paymentdetail/:userId', paymentController.getPaymentDetails);


module.exports = router;