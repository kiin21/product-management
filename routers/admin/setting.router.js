const express = require('express');
const router = express.Router();
const multer = require('multer');
const controller = require('../../controllers/admin/setting.controller');

const uploadImage = require('../../middlewares/admin/uploadImageToClould.middlewares');
const upload = multer()

router.get('/general', controller.general);

router.patch('/general',
    upload.single('logo'),
    uploadImage.upload,
    controller.generalUpdate);

module.exports = router;