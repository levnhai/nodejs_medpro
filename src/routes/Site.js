const express = require('express');
const router = express.Router();
const siteController = require('../app/Controller/SiteController');

router.get('/all-user', siteController.getAllUsers);
router.delete('/delete-user', siteController.DeleteUser);
router.put('/edit-user', siteController.EditUser);
router.post('/create-docter', siteController.CreateDocter);
router.get('/all-docter', siteController.getAllDocters);
router.put('/edit-docter', siteController.editDocter);
router.delete('/delete-docter', siteController.deleteDocter);

router.get('/', siteController.index);

module.exports = router;
