const User = require('../Models/User');

const { mutipleMongooseToObject } = require('../../util/mongoose');

class SiteController {
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
