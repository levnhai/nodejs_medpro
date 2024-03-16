const UserServices = require('../../services/UserServices');

class userController {
  async checkPhoneNumber(req, res) {
    let { phoneNumber } = req.body;
    let isCheckPhoneExists = await UserServices.handleCheckPhoneExists(phoneNumber);
    return res.status(200).json({
      isCheckPhoneExists,
    });
  }

  async sendOtp(req, res) {
    let sendOtp = await UserServices.handleSendOtp();
    return res.status(200).json({
      errCode: sendOtp.errCode,
      messageError: sendOtp.messageError,
      otpInput: sendOtp.otpInput,
    });
  }

  async verifyOtp(req, res) {
    let otpInput = req.body.otpInput;
    let VerifyOtpInput = await UserServices.handleVerifyOtpInput(otpInput);
    return VerifyOtpInput;
  }
  async LoginUser(req, res) {
    const { phoneNumber } = req.body;
    const { password } = req.body;

    let userData = await UserServices.handleLogin(phoneNumber, password);
    return res.status(200).json({
      errCode: userData.errCode,
      messageError: userData.messageError,
      status: userData.status,
      userData: userData.user,
    });
  }

  async createAccount(req, res) {
    let data = req.body;
    let userData = await UserServices.handleCreateAccount(data);
    return res.status(200).json({
      errCode: userData.errCode,
      messageError: userData.messageError,
      userData: userData.user,
    });
  }

  index(req, res, next) {
    res.send('hai le');
  }
}

module.exports = new userController();
