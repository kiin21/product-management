const express = require('express');
const router = express.Router();
const controller = require('../../controllers/admin/products.controller');

router.get('/', controller.products);

router.patch('/change-status/:status/:ID', controller.changeStatus);


module.exports = router;