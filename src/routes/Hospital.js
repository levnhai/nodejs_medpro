const express = require('express');
const router = express.Router();
const hospitalController = require('../app/Controller/HospitalController');

router.post('/create-new-hospital', hospitalController.createHospital);
router.get('/get-all-hospital', hospitalController.getAllHospital);
router.post('/get-hospital-by-id', hospitalController.getHospitalById);
router.post('/get-docter-by-hospitalId', hospitalController.getDocterByHospitalId);

module.exports = router;
