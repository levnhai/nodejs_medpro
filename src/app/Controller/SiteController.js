const AdminServices = require('../../services/AdminServices');
const SiteServices = require('../../services/SiteServices');

const { mutipleMongooseToObject } = require('../../util/mongoose');

class SiteController {
  async getAllData(req, res, next) {
    let id = req.query.id; // user, admin, docter...
    console.log('id', id);
    if (!id) {
      return res.status(200).json({
        errcode: 1,
        errMessage: 'Id not found....',
      });
    }

    let users = await SiteServices.getAllData(id);
    console.log('users', users);
    return res.status(200).json({
      users,
    });
  }

  async createAccount(req, res) {
    let data = req.body;
    let userData = await SiteServices.handleCreateAccount(data);
    return res.status(200).json({
      errCode: userData.errCode,
      messageError: userData.messageError,
      userData: userData.user,
    });
  }
  async EditUser(req, res, next) {
    let user = await SiteServices.handleEditUser(req.body);
    return res.status(200).json({
      errcode: user.errcode,
      errMessage: user.messageError,
      data: user,
    });
  }

  ///

  async DeleteUser(req, res) {
    let userId = req.body.id;
    if (!userId) {
      return res.status(200).json({
        errcode: 1,
        errMessage: 'Không tìm thấy Người dùng',
      });
    }
    let user = await SiteServices.deleteUser(userId);
    return res.status(200).json({
      user,
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
