const express = require('express');
const orderRoute = require('./routes/order');
const businessRoute = require('./routes/business');
const categoryRoute = require('./routes/category');
const customerRoute = require('./routes/customer');
const userRoute = require('./routes/user');
const authGuard = require('./middleware/authGuard');

const router = express.Router();

router.use('/user', userRoute);
router.use('/category', categoryRoute);
router.use('/order', orderRoute);
router.use('/business', businessRoute);
router.use('/customer', customerRoute);

module.exports = router;