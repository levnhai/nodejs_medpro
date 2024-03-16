const DocterDb = require('../app/Models/Docter');

const outStandingDocter = (limitInput) => {
  console.log(limitInput);
  return new Promise(async (resolve, reject) => {
    try {
      let docter = await DocterDb.find({}).limit(2);

      console.log('count', docter.length);
      resolve({
        errCode: 0,
        data: docter,
      });
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = { outStandingDocter };
