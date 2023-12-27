const UserServices = require('../../services/UserServices');

class userController {
  async checkPhoneNumber(req, res) {
    let phone = req.body.phone;
    let phoneNumber = await UserServices.handleCheckUser(phone);
    console.log('phoneNumber', phoneNumber);

    return res.status(200).json({
      errCode: phoneNumber.errCode,
      messageError: phoneNumber.messageError,
      status: phoneNumber.status,
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
