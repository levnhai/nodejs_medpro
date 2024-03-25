const express = require('express');
const router = express.Router();
const userController = require('../app/Controller/UserController');
const docterController = require('../app/Controller/DocterController');

router.post('/check-phone', userController.checkPhoneNumber);
router.post('/send-otp', userController.sendOtp);
router.post('/verify-otp', userController.verifyOtp);
router.post('/login', userController.LoginUser);
// router.post('/create-account', userController.createAccount);
// router.get('/get-top-docter', docterController.outStandingDocter);
router.get('/', userController.index);

module.exports = router;
