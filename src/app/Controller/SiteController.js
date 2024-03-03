const AdminServices = require('../../services/AdminServices');

const { mutipleMongooseToObject } = require('../../util/mongoose');

class SiteController {
  async getAllUsers(req, res, next) {
    let id = req.query.id; // all or id
    if (!id) {
      return res.status(200).json({
        errcode: 1,
        errMessage: 'User not found',
      });
    }

    let users = await AdminServices.getAllUsers(id);

    return res.status(200).json({
      errcode: 0,
      errMessage: 'Lấy tất cả người dùng',
      data: users,
    });
  }
  async DeleteUser(req, res) {
    let userId = req.body.id;
    if (!userId) {
      return res.status(200).json({
        errcode: 1,
        errMessage: 'Không tìm thấy Người dùng',
      });
    }
    let user = await AdminServices.deleteUser(userId);
    return res.status(200).json({
      user,
    });
  }

  async EditUser(req, res) {
    let user = await AdminServices.EditUser(req.body);
    return res.status(200).json({
      user,
    });
  }

  async CreateDocter(req, res) {
    let data = req.body;
    console.log(data);
    let DocterData = await AdminServices.handleCreateAccount(data);
    return res.status(200).json({
      errCode: DocterData.errCode,
      messageError: DocterData.messageError,
      userData: DocterData.docter,
    });
  }

  async getAllDocters(req, res, next) {
    let id = req.query.id; // all or id
    if (!id) {
      return res.status(200).json({
        errcode: 1,
        errMessage: 'docter not found',
      });
    }

    let docters = await AdminServices.getAllDocter(id);

    return res.status(200).json({
      errcode: 0,
      errMessage: 'thành công',
      data: docters,
    });
  }
  async editDocter(req, res, next) {
    let data = req.body;
    console.log(data);
    let docter = await AdminServices.editDocter(req.body);
    return res.status(200).json({
      errcode: docter.errcode,
      errMessage: docter.messageError,
      data: docter,
    });
  }

  async deleteDocter(req, res, next) {
    let docterId = req.body.id;
    console.log('docterId', docterId);

    if (!docterId) {
      return res.status(200).json({
        errcode: 1,
        errMessage: 'User not found',
      });
    }
    let docter = await AdminServices.deleteDocter(docterId);

    return res.status(200).json({
      errcode: 0,
      errMessage: 'thành công',
      data: docter,
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
