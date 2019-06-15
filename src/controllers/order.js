const Order = require('../models/order'); 

async function addOrder(req, res){
    const {customerName, businessName, status, grade, comment} = req.body;
    
    const existingOrder = await Order.findById(orderid).exec();

    if (existingOrder){
        return res.status(400).json('Duplicate order id');
    }

    const order = new Order({
        customerName, businessName, status, grade, comment
    });
    await order.save();
    return res.json(order);
}

async function getAllOrders(req, res){
    const orders = await Order.find().exec();
    return res.json(orders);
}
