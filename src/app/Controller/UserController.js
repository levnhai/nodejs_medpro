const UserServices = require('../../services/UserServices');

class userController {
  async getAllData(req, res, next) {
    let id = req.query.id; // user, admin, docter...
    if (!id) {
      return res.status(200).json({
        errcode: 1,
        errMessage: 'Id not found....',
      });
    }

    let users = await UserServices.getAllData(id);
    return res.status(200).json({
      data: users,
    });
  }

  async createAccount(req, res) {
    let data = req.body;
    console.log(data);
    let userData = await UserServices.handleCreateAccount(data);
    return res.status(200).json({
      errCode: userData.errCode,
      messageError: userData.messageError,
      userData: userData.user,
    });
  }

  async EditUser(req, res, next) {
    let user = await UserServices.handleEditUser(req.body);
    return res.status(200).json({
      errcode: user.errcode,
      errMessage: user.messageError,
      data: user,
    });
  }

  async DeleteUser(req, res) {
    let userId = req.body.id;
    if (!userId) {
      return res.status(200).json({
        errcode: 1,
        errMessage: 'Không tìm thấy Người dùng',
      });
    }
    let user = await UserServices.deleteUser(userId);
    return res.status(200).json({
      user,
    });
  }

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

  index(req, res, next) {
    res.send('hai le');
  }
}

module.exports = new userController();
