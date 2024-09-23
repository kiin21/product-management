const express = require('express');
const router = express.Router();
const controller = require('../../controllers/client/cart.controller');

router.get('/', controller.index);

router.post('/add/:productId', controller.add);

router.delete('/delete/:id', controller.delete);

router.get('/update/:id/:quantity', controller.update);

module.exports = router;