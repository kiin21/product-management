const express = require('express');
const router = express.Router();
const controller = require('../../controllers/admin/product-category.controller');

const multer = require('multer')
const uploadImage = require('../../middlewares/admin/uploadImageToClould.middlewares');
const validatorCreateProduct = require('../../validates/admin/product-category.validate');
const upload = multer({})

router.get('/', controller.index);

router.get('/create', controller.create);

router.post(
    '/create',
    upload.single('thumbnail'),
    uploadImage.upload,
    validatorCreateProduct.createPost,
    controller.createPost
);

module.exports = router;