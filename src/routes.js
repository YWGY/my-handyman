const express = require('express');
const orderRoute = require('./routes/order');
const customerRoute = require('./routes/customer');
const categoryRoute = require('./routes/category');

const router = express.Router();

router.use('/categories', categoryRoute);
router.use('/orders', orderRoute);


module.exports = router;