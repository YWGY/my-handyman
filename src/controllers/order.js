const Order = require('../models/order'); 

async function addOrder(req, res){
    const {orderid} = req.params;
    const {customerName, businessName, status, grade, comment} = req.body;

    const existingOrder = await Order.findById(orderid).exec();

    if (existingOrder){
        return res.status(400).json('Duplicate order id');
    }