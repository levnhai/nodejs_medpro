const express = require('express');
const router = express.Router();
const siteController = require('../app/Controller/SiteController');
const docterController = require('../app/Controller/DocterController');

router.get('/get-top-docter', docterController.outStandingDocter);
router.post('/save-infor-docter', docterController.saveInforDocter);
router.get('/detail-infor-docter', docterController.getDetailInforDocter);

// get api province
router.get('/get-all-province', siteController.getAllProvince);
router.get('/get-all-code-services', siteController.getAllCodeServices);
router.post('/bulk-create-schedule', siteController.bulkCreateSchedule);

router.get('/', siteController.index);
module.exports = router;
