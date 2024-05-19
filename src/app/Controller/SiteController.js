const SiteServices = require('../../services/SiteServices');

const { mutipleMongooseToObject } = require('../../util/mongoose');

class SiteController {
  // province
  async getAllProvince(req, res, next) {
    let provinces = await SiteServices.getAllProvince();
    return res.status(200).json({
      provinces,
    });
  }

  async getAllCodeServices(req, res, next) {
    let type = req.query.type;
    let allCodeData = await SiteServices.getAllCodeDataByType(type);
    return res.status(200).json({
      allCodeData,
    });
  }

  async bulkCreateSchedule(req, res, next) {
    let schedule = await SiteServices.bulkCreateSchedule(req.body);
    return res.status(200).json({
      schedule,
    });
  }

  index(req, res, next) {
    User.find({})
      .then((users) => {
        res.render('home', {
          users: mutipleMongooseToObject(users),
        });
      })
      .catch(next);
  }
}

module.exports = new SiteController();
