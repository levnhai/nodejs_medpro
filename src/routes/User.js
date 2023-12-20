const express = require('express');
const router = express.Router();
const userController = require('../app/Controller/UserController');

router.post('/check-phone', userController.checkPhoneNumber);
router.post('/send-otp', userController.sendOtp);
router.post('/verify-otp', userController.verifyOtp);
router.get('/', userController.index);

module.exports = router;
