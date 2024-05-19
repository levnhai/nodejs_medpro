const DocterDb = require('../app/Models/Docter');
const DocterInforDb = require('../app/Models/docter_Infor');

const outStandingDocter = (limitInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      const roleId = 'R2';
      const docter = await DocterDb.aggregate([
        {
          $lookup: {
            from: 'allcodes',
            localField: 'positionId',
            foreignField: 'keyMap',
            as: 'positionIdData',
          },
        },
        {
          $match: {
            $expr: {
              $eq: ['$roleId', roleId],
            },
          },
        },
        { $limit: +limitInput },

        {
          $project: {
            email: 1,
            fullName: 1,
            address: 1,
            roleId: 1,
            image: 1,
            positionId: 1,
            'positionIdData.keyMap': 1,
            'positionIdData.valueEn': 1,
            'positionIdData.valueVi': 1,
          },
        },
      ]);

      resolve({
        errCode: 0,
        data: docter,
        // account: account,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const saveInforDocter = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let docterInfor = await DocterInforDb.findOne({ docterId: data.docters });

      //  upsert docter_infor
      if (docterInfor) {
        // update
        docterInfor.docterId = data.docters;
        docterInfor.priceId = data.prices;
        docterInfor.paymentId = data.payments;
        docterInfor.provinceId = data.provinces;
        docterInfor.hospitalId = data.hospitals;
        docterInfor.note = data.note;
        docterInfor.introduceDocter = data.introduceDocter;
        await docterInfor.save();
        resolve({
          errCode: 0,
          errMessage: 'Update docter infor successfully !',
        });
      } else {
        let docterData = await DocterInforDb.create({
          docterId: data.docters,
          priceId: data.prices,
          provinceId: data.provinces,
          paymentId: data.payments,
          hospitalId: data.hospitals,
          note: data.note,
          introduceDocter: data.introduceDocter,
        });
        resolve({
          errCode: 0,
          errMessage: 'save docter infor successfully !',
          docterData,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = { outStandingDocter, saveInforDocter };
