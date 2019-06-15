const express = require('express');
const orderRoute = require('./routes/order');
const businessRoute = require('./routes/business');
const categoryRoute = require('./routes/category');

const router = express.Router();

router.use('/categories', categoryRoute);
router.use('/orders', orderRoute);
router.use('/businesses', businessRoute);

module.exports = router;