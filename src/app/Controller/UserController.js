const UserServices = require('../../services/UserServices');

class userController {
  async checkPhoneNumber(req, res) {
    let phone = req.body.phone;
    let phoneNumber = await UserServices.handleCheckUser(phone);

    return res.status(200).json({
      errCode: phoneNumber.errCode,
      messageError: phoneNumber.messageError,
      user: phoneNumber.user ? phoneNumber.user : {},
    });
  }

  async sendOtp(req, res) {
    let sendOtp = await UserServices.handleSendOtp();

    console.log(sendOtp);
    return res.status(200).json({
      errCode: sendOtp.errCode,
      messageError: sendOtp.messageError,
      otpInput: sendOtp.otpInput,
    });
  }

  async verifyOtp(req, res) {
    let otpInput = req.body.otpInput;
    console.log(otpInput);
    let VerifyOtpInput = await UserServices.handleVerifyOtpInput(otpInput);
    return VerifyOtpInput;
  }

  index(req, res, next) {
    res.send('hai le');
  }
}

module.exports = new userController();
