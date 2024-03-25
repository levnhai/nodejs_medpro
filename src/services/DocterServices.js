const DocterDb = require('../app/Models/Docter');

const outStandingDocter = (limitInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      const roleId = 'R2'; // d
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

module.exports = { outStandingDocter };
