const express = require('express');
const router = express.Router();
const controller = require('../../controllers/admin/accounts.controller');
const validatorCreateAccount = require('../../validates/admin/account.validate');
const multer = require('multer')

const uploadImage = require('../../middlewares/admin/uploadImageToClould.middlewares');
const upload = multer()

router.get('/', controller.index);

router.get('/create', controller.create);

router.post(
    '/create',
    upload.single('avatar'),
    uploadImage.upload,
    validatorCreateAccount.createAccount,
    controller.createPost
);


router.get('/edit/:id', controller.edit);
router.patch('/edit/:id', 
    upload.single('avatar'),
    uploadImage.upload,
    validatorCreateAccount.editPatch,
    controller.editPatch);

module.exports = router;