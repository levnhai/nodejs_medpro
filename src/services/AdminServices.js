const UserDb = require('../app/Models/User');
const DocterDb = require('../app/Models/Docter');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

// get all user
const getAllUsers = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = {};
      if (userId === 'all') {
        user = await UserDb.find({}, '-password -reEnterPassword');
      } else {
        user = await UserDb.findOne({
          where: { id: userId },
          attributes: {
            exclude: ['password'],
          },
        });
      }
      resolve({
        errCode: 0,
        errMessage: 'Lấy tất cả người dùng',
        data: user,
      });
    } catch (error) {
      reject(error);
    }
  });
};

// delete a user
const deleteUser = (docterId) => {
  return new Promise(async (resolve, reject) => {
    try {
      await UserDb.deleteOne({ _id: docterId });
      resolve({
        errCode: 0,
        errMessage: 'deleted docter successfully',
      });
    } catch (error) {
      reject(error);
    }
  });
};

// edit user
const EditUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await UserDb.findOne({ _id: data.id });
      let isPhoneNumber = await checkPhoneNumber(data.phoneNumber);
      console.log('isPhoneNumber', isPhoneNumber);

      if (!user) {
        resolve({
          errCode: 2,
          errMessage: 'Không tìm thấy người dùng',
        });
      } else {
        !isPhoneNumber
          ? resolve({
              errCode: 3,
              errMessage: 'Số điện thoại đã tồn tại',
            })
          : await UserDb.updateOne({
              phoneNumber: data.phoneNumber,
              fullName: data.fullName,
            });
        resolve({
          errCode: 0,
          errMessage: 'Tạo tài khoản thành công',
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

// add docter
const handleCreateAccount = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const DocterData = {};
      let hastpassword = await hastPassword(data.password);
      let hastReEnterPassword = await hastPassword(data.reEnterPassword);
      let isCheckphoneExists = await checkPhoneNumber(data.phoneNumber);
      if (isCheckphoneExists) {
        if (data.password === data.reEnterPassword) {
          const docter = await DocterDb.create({
            phoneNumber: `0${data.phoneNumber}`,
            email: data.email,
            address: data.address,
            gender: data.gender,
            positionId: data.positionId,
            fullName: data.fullName,
            password: hastpassword,
            roleId: data.roleId,
            reEnterPassword: hastReEnterPassword,
            referralCode: data.referralCode,
            image: data.image,
          });
          (DocterData.errCode = 0),
            (DocterData.messageError = 'Tạo tài khoản thành công'),
            (DocterData.docter = docter);
          resolve(DocterData);
        } else {
          (DocterData.errCode = 1), (DocterData.messageError = 'Nhập khẩu không khớp'), (DocterData.docter = {});
          resolve(DocterData);
        }
      } else {
        (DocterData.errCode = 2), (DocterData.messageError = 'Số điện thoại đã tồn tại'), (DocterData.docter = {});
        resolve(DocterData);
      }
    } catch (error) {
      reject(error);
    }
  });
};

// get all docter
const getAllDocter = (docterId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let docter = {};
      if (docterId === 'all') {
        docter = await DocterDb.find({}, '-password -reEnterPassword');
      } else {
        user = await DocterDb.findOne({
          where: { id: docterId },
          attributes: {
            exclude: ['password'],
          },
        });
      }
      resolve(docter);
    } catch (error) {
      reject(error);
    }
  });
};

// delete a docter
const deleteDocter = (docterId) => {
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

// edit docter
const editDocter = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let docter = await DocterDb.findOne({ _id: data.id });
      let isPhoneNumber = await checkPhoneNumber(data.phoneNumber);
      if (!docter) {
        resolve({
          errCode: 2,
          result: false,
          errMessage: 'Không tìm thấy bác sỹ',
        });
      } else {
        !isPhoneNumber
          ? resolve({
              errCode: 3,
              result: false,
              errMessage: 'Số điện thoại đã tồn tại',
            })
          : await DocterDb.updateOne({
              fullName: data.fullName,
              phoneNumber: data.phoneNumber,
              email: data.email,
              password: data.password,
              reEnterPassword: data.reEnterPassword,
              address: data.address,
              gender: data.gender,
              positionId: data.positionId,
              roleId: data.roleId,
            });
        resolve({
          errCode: 0,
          result: true,
          errMessage: 'edit docter successfully',
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
// kiểm tra xem sdt tồn tại hay chưa
const checkPhoneNumber = (phoneNumber) => {
  return new Promise(async (resolve, reject) => {
    try {
      let ischeckPhoneNumber = await DocterDb.findOne({ phoneNumber: phoneNumber });
      ischeckPhoneNumber === null ? resolve(true) : resolve(false);
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
  getAllUsers,
  deleteUser,
  EditUser,
  handleCreateAccount,
  getAllDocter,
  editDocter,
  deleteDocter,
};
