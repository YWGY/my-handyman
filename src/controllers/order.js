const Order = require('../models/order'); 
const Customer = require('../models/customer');
const Business = require('../models/business');

async function addOrder(req, res){
    const {customerName, businessName, status, grade, comment} = req.body;
    
    // const existingOrder = await Order.findById(orderid).exec();

    // if (existingOrder){
    //     return res.status(400).json('Duplicate order id');
    // }

    const order = new Order({
        customerName, businessName, status, grade, comment
    });
    await order.save();
    const customer = await Customer.findById(customerName).exec();
    const business = await Business.findById(businessName).exec();
    customer.orders.addToSet(order._id);
    business.orders.addToSet(order._id);
    await customer.save();
    await business.save();
    return res.json(order);
}

async function getAllOrders(req, res){
    const orders = await Order.find().exec();
    return res.json(orders);
}

async function getOrder(req, res){
    const {orderid} = req.params; //设order的id

    const order = await Order.findById(orderid)
    .populate('customer','customerName')
    .populate('business','businessName')
    .exec();
    
    if(!order){
        return res.status(404).json('order not found');
    }
    return res.json(order);
}

async function updateOrder(req, res){
    const {orderid} = req.params;
    const {customerName, businessName, status, grade, comment} = req.body;

    const newOrder = await Order.findByIdAndUpdate(
        orderid,
        {customerName, businessName, status, grade, comment},
        {new:true}
    ).exec();
    if (!newOrder){
        return res.status(404).json('order not found');
    }
    return res.json(newOrder);
}

async function deleteOrder(req, res){
    const { orderid } = req.params;
    // console.log(orderid);
  const order = await Order.findByIdAndDelete(orderid).exec();
  if (!order) {
    return res.status(404).json('order not found');
  }

  const customer = await Customer.findById(order.customerName).exec();
  const business = await Business.findById(order.businessName).exec();
  customer.orders.pull(order._id);
  business.orders.pull(order._id);
  await customer.save();
  await business.save();
  return res.sendStatus(200);
}

module.exports = {
    addOrder,
    getAllOrders,
    getOrder,
    updateOrder,
    deleteOrder,
  };
