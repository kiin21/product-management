const express = require('express');
const router = express.Router();
const controller = require('../../controllers/admin/my-account.controller');
const multer = require('multer')

const uploadImage = require('../../middlewares/admin/uploadImageToClould.middlewares');
const upload = multer()


router.get('/', controller.index);
router.get('/edit', controller.edit);
router.patch(
    '/edit',
    upload.single('avatar'),
    uploadImage.upload,
    controller.editPatch
);

module.exports = router;