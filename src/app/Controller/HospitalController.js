const HospitalServices = require('../../services/HospitalServices');

class HospitalController {
  async createHospital(req, res, next) {
    let data = req.body;
    let hospitalData = await HospitalServices.handleCreateHospital(data);
    return res.status(200).json({
      errCode: hospitalData.errCode,
      messageError: hospitalData.messageError,
      hospitalData: hospitalData.data,
    });
  }

  async getAllHospital(req, res, next) {
    let hospital = await HospitalServices.getAllHospital();
    return res.status(200).json({
      hospital,
    });
  }

  async getHospitalById(req, res, next) {
    const hospitalId = req.body.hospitalId;
    let hospital = await HospitalServices.getHospitalById(hospitalId);
    return res.status(200).json({
      hospital,
    });
  }

  async getDocterByHospitalId(req, res, next) {
    const hospitalId = req.body.hospitalId;
    let hospital = await HospitalServices.getDocterByHospitalId(hospitalId);
    return res.status(200).json({
      hospital,
    });
  }

  async getPaginatedHospital(req, res, next) {
    let hospital = await HospitalServices.getAllHospital();
    return res.status(200).json({
      hospital,
    });
  }
}
module.exports = new HospitalController();
