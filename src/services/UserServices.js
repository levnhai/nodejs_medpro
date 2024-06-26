const DocterDb = require('../app/Models/Docter');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const { pick } = require('lodash');

// get all user
const getAllData = (Id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = {};
      if (Id === 'R3') {
        data = await DocterDb.find(
          { $or: [{ roleId: 'R3' }, { roleId: { $exists: false } }] },
          '-image -password -reEnterPassword',
        );
      } else if (Id === 'R2') {
        data = await DocterDb.find({ roleId: 'R2' }, ' -password -reEnterPassword ');
      } else if (Id === 'R1') {
        data = await DocterDb.find({ roleId: 'R1' }, ' -password -reEnterPassword');
      }
      resolve({
        errCode: 0,
        errMessage: 'get all data successfully ...',
        data,
      });
    } catch (error) {
      reject(error);
    }
  });
};

// edit user
const handleEditUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await DocterDb.findOne({ _id: data.id });
      let isPhoneNumber = true;
      if (!user.phoneNumber === data.phoneNumber) {
        isPhoneNumber = await checkPhoneNumber(data.phoneNumber);
      }
      if (!user) {
        resolve({
          errCode: 2,
          result: false,
          errMessage: 'Không tìm thấy người dùng',
        });
      } else {
        !isPhoneNumber
          ? resolve({
              errCode: 3,
              result: false,
              errMessage: 'Số điện thoại đã tồn tại',
            })
          : await DocterDb.findOneAndUpdate(
              { _id: data.id },
              {
                fullName: data.fullName,
                phoneNumber: data.phoneNumber,
                email: data.email,
                password: data.password,
                reEnterPassword: data.reEnterPassword,
                address: data.address,
                gender: data.gender,
                positionId: data.positionId,
                roleId: data.roleId,
                image: data.image,
              },
              { new: true },
            );
        resolve({
          errCode: 0,
          result: true,
          errMessage: 'edit user successfully',
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

// delete a user
const deleteUser = (docterId) => {
  return new Promise(async (resolve, reject) => {
    try {
      await DocterDb.deleteOne({ _id: docterId });
      resolve({
        errCode: 0,
        errMessage: 'deleted docter successfully',
      });
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
          const user = await DocterDb.create({
            phoneNumber: data.phoneNumber,
            fullName: data.fullName,
            password: hastpassword,
            reEnterPassword: hastReEnterPassword,
            referralCode: data.referralCode,
            email: data.email,
            address: data.address,
            gender: data.gender,
            roleId: data.roleId,
            positionId: data.positionId,
            image: data.image,
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
      let user = await DocterDb.findOne({
        phoneNumber: phoneNumber,
      });

      let isPassword = await bcrypt.compare(password, user.password);

      // lấy vài trường trong object
      const result = pick(user, ['fullName', 'email', 'phoneNumber', 'roleId']);
      if (isPassword) {
        (userData.errCode = 0),
          (userData.messageError = 'mật khẩu chính xác'),
          (userData.status = true),
          (userData.user = result);
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

const handleCheckPhoneExists = (phoneNumberInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      let isCheckPhoneExists = await DocterDb.findOne({
        phoneNumber: phoneNumberInput,
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
  handleLogin,
  handleCheckPhoneExists,
  getAllData,
  handleEditUser,
  deleteUser,
  handleCreateAccount,
};
