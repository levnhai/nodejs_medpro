const User = require('../app/Models/User');
const UserDb = require('../app/Models/User');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

const handleSendOtp = () => {
  return new Promise((resolve, reject) => {
    try {
      let otpIputData = {};
      const randomOtp = generateOTP();
      if (randomOtp) {
        (otpIputData.errCode = 0),
          (otpIputData.messageError = 'random otp thành công'),
          (otpIputData.otpInput = randomOtp);
      } else {
        (otpIputData.errCode = 1), (otpIputData.messageError = 'random otp thành công'), (otpIputData.otpInput = {});
      }
      resolve(otpIputData);
    } catch (error) {
      reject(error);
    }
  });
};

const handleVerifyOtpInput = (otpInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = handleSendOtp();
    } catch (error) {
      reject(error);
    }
  });
};

const handleLogin = (phoneNumber, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let user = await UserDb.findOne({
        phoneNumber: phoneNumber,
      });
      let isPassword = await bcrypt.compare(password, user.password);
      if (isPassword) {
        (userData.errCode = 0),
          (userData.messageError = 'mật khẩu chính xác'),
          (userData.status = true),
          (userData.user = user);
      } else {
        (userData.status = false),
          (userData.errCode = 1),
          (userData.messageError = 'mật khẩu không chính xác'),
          (userData.user = {});
      }
      resolve(userData);
    } catch (error) {
      reject(error);
    }
  });
};

const handleCreateAccount = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const userData = {};
      let hastpassword = await hastPassword(data.password);
      let hastReEnterPassword = await hastPassword(data.reEnterPassword);

      const isCheckphoneExists = await handleCheckPhoneExists(data.phoneNumber);
      if (!isCheckphoneExists) {
        if (data.password === data.reEnterPassword) {
          const user = await UserDb.create({
            phoneNumber: data.phoneNumber,
            fullName: data.fullName,
            password: hastpassword,
            reEnterPassword: hastReEnterPassword,
            referralCode: data.referralCode,
          });
          (userData.errCode = 0), (userData.messageError = 'Tạo tài khoản thành công'), (userData.user = user);
        } else {
          (userData.errCode = 1), (userData.messageError = 'Nhập khẩu không khớp'), (userData.user = {});
        }
      } else {
        (userData.errCode = 2), (userData.messageError = 'Số điện thoại đã tồn tại'), (userData.user = {});
        resolve(userData);
      }

      resolve(userData);
    } catch (error) {
      reject(error);
    }
  });
};

const handleCheckPhoneExists = (phone) => {
  return new Promise(async (resolve, reject) => {
    try {
      let isCheckPhoneExists = await UserDb.findOne({
        phoneNumber: phone,
      });

      if (isCheckPhoneExists) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (error) {
      reject(error);
    }
  });
};

// tạo 1 otp ngẫu nhiên 6 số
const generateOTP = () => {
  const digits = '0123456789';
  let OTP = '';
  for (let i = 0; i < 6; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
};

let hastPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  handleSendOtp,
  handleCreateAccount,
  handleLogin,
  handleCheckPhoneExists,
};
