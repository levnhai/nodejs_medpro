const UserDb = require('../app/Models/User');
const twilio = require('twilio');
const { mongooseToObject } = require('../util/mongoose');

const accountSid = 'ACc12cd7f7073ff2fad5ce11676b7e42c9';
const authToken = 'b6f0abaaf74cf0eb09845fcb597bd77d';
const client = twilio(accountSid, authToken);

const handleCheckUser = (phone) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let isPhone = await checkPhone(phone);
      console.log(isPhone);

      if (isPhone) {
        (userData.errCode = 0), (userData.messageError = 'tìm thấy'), (userData.user = isPhone);
      } else {
        (userData.errCode = 1), (userData.messageError = 'Số điện thoại không tồn tại '), (userData.user = isPhone);
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

const checkPhone = (phone) => {
  return new Promise(async (resolve, reject) => {
    try {
      let isPhone = await UserDb.findOne({
        phoneNumber: phone,
      });
      resolve(isPhone);
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

module.exports = {
  handleCheckUser,
  handleSendOtp,
};
