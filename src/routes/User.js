const express = require('express');
const router = express.Router();
const userController = require('../app/Controller/UserController');
const docterController = require('../app/Controller/DocterController');

router.get('/get-all-data', userController.getAllData); // role
router.put('/edit-user', userController.EditUser);
router.post('/create-account', userController.createAccount);
router.delete('/delete-user', userController.DeleteUser);

router.post('/check-phone', userController.checkPhoneNumber);
router.post('/send-otp', userController.sendOtp);
router.post('/verify-otp', userController.verifyOtp);
router.post('/login', userController.LoginUser);
router.get('/', userController.index);

module.exports = router;
