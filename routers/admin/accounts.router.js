const express = require('express');
const router = express.Router();
const controller = require('../../controllers/admin/accounts.controller');
const multer = require('multer')
const validatorCreateAccount = require('../../validates/admin/account.validate');


const uploadImage = require('../../middlewares/admin/uploadImageToClould.middlewares');
const upload = multer({})

router.get('/', controller.index);

router.get('/create', controller.create);

router.post(
    '/create',
    upload.single('avatar'),
    uploadImage.upload,
    validatorCreateAccount.createAccount,
    controller.createPost
);

module.exports = router;