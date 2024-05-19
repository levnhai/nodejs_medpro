const HosptalDb = require('../app/Models/hospital');
const DocterInforDb = require('../app/Models/docter_Infor');
const DocterDb = require('../app/Models/Docter');
// const ObjectId = mongoose.Types.ObjectId;
const { ObjectId } = require('mongoose');

// get all user
const handleCreateHospital = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const hospitalData = {};

      const hospital = await HosptalDb.create({
        fullName: data.name,
        address: data.address,
        phoneNumber: data.phoneNumber,
        provinceId: data.provinceId,
        workingTime: data.workingTime,
        contentHTML: data.contentHTML,
        contentMarkdown: data.contentMarkdown,
        image: data.image,
      });
      (hospitalData.errCode = 0), (hospitalData.messageError = 'Thêm thành công'), (hospitalData.data = hospital);
      resolve(hospitalData);
    } catch (error) {
      reject(error);
    }
  });
};

const getAllHospital = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = {};
      data = await HosptalDb.find({});
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

const getHospitalById = (hospitalId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = {};
      data = await HosptalDb.findOne({ _id: hospitalId });

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

const getDocterByHospitalId = (hospitalId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await DocterInforDb.aggregate([
        {
          $match: { hospitalId: hospitalId },
        },
        {
          $lookup: {
            from: 'docters',
            let: { docterId: { $toObjectId: '$docterId' } },
            pipeline: [
              {
                $match: { $expr: { $eq: ['$_id', '$$docterId'] } },
              },
            ],
            as: 'docterInforData',
          },
        },
        {
          $lookup: {
            from: 'schedules',
            localField: 'docterId',
            foreignField: 'docterId',
            as: 'scheduleData',
          },
        },
        {
          $lookup: {
            from: 'allcodes',
            localField: 'priceId',
            foreignField: 'keyMap',
            as: 'priceData',
          },
        },

        {
          $project: {
            priceId: 1,
            'docterInforData.fullName': 1,
            'docterInforData.gender': 1,
            'scheduleData.date': 1,
            'scheduleData.timeType': 1,
            'priceData.valueVn': 1,
          },
        },
      ]);

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

module.exports = {
  handleCreateHospital,
  getAllHospital,
  getHospitalById,
  getDocterByHospitalId,
};
