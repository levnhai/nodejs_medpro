const User = require('../app/Models/User');
const UserDb = require('../app/Models/User');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

const handleCheckUser = (phone) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let isPhone = await checkPhone(phone);

      if (isPhone) {
        (userData.errCode = 0), (userData.messageError = 'tìm thấy'), (userData.status = isPhone);
      } else {
        (userData.errCode = 1), (userData.messageError = 'Số điện thoại không tồn tại '), (userData.status = isPhone);
      }

      resolve(userData);
    } catch (error) {
      reject(error);
    }
  });
};

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
      console.log('data:', data);
      console.log('người dùng nhập vào:', otpInput);
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
      if (data.password === data.reEnterPassword) {
        const user = await UserDb.create({
          phoneNumber: data.phone,
          fullName: data.fullName,
          password: hastpassword,
          reEnterPassword: hastReEnterPassword,
          referralCode: data.referralCode,
        });
        (userData.errCode = 0), (userData.messageError = 'Tạo tài khoản thành công'), (userData.user = user);
      } else {
        (userData.errCode = 1), (userData.messageError = 'nhập khẩu không khớp'), (userData.user = {});
      }

      resolve(userData);
    } catch (error) {
      reject(error);
    }
  });
};

const checkPhone = (phone) => {
  return new Promise(async (resolve, reject) => {
    try {
      let isPhone = await UserDb.findOne({
        phoneNumber: phone,
      });
      resolve(isPhone ? true : false);
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
  handleCheckUser,
  handleSendOtp,
  handleCreateAccount,
  handleLogin,
};
