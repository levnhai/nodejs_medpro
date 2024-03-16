const express = require('express');
const router = express.Router();
const siteController = require('../app/Controller/SiteController');

router.get('/all-data', siteController.getAllData);
router.put('/edit-user', siteController.EditUser);
router.post('/create-account', siteController.createAccount);
router.delete('/delete-user', siteController.DeleteUser);
router.get('/', siteController.index);

module.exports = router;
