const DocterDb = require('../app/Models/Docter');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

// get all user
const getAllData = (Id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = {};
      if (Id === 'patiend') {
        data = await DocterDb.find({ roleId: 'patiend' }, '-image -password -reEnterPassword');
        console.log('user');
        console.log(data);
      } else if (Id === 'docter') {
        console.log('docter');
        data = await DocterDb.find({ roleId: 'docter' }, ' -password -reEnterPassword');
      } else if (Id === 'admin') {
        data = await DocterDb.find({ roleId: 'admin' }, ' -password -reEnterPassword');
      }
      console.log('data', data);
      resolve({
        errCode: 0,
        errMessage: 'get all data successfully ...',
        data: data,
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
  getAllData,
  handleCreateAccount,
  handleEditUser,
  deleteUser,
};
