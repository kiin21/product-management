const express = require('express');
const router = express.Router();
const controller = require('../../controllers/admin/products.controller');

router.get('/', controller.products);

router.patch('/change-status/:status/:ID', controller.changeStatus);

router.patch('/changes-multi-status', controller.changeMultiStatus);

router.delete('/delete/:id', controller.deleteItem);

module.exports = router;