const Customer = require('../models/customer'); 
const Order = require('../models/order'); 


async function addCustomer(req, res){
    const {customerid} = req.params;
    const {customerName, preferName, email, phone} = req.body;
    
    const existingCustomer = await Customer.findById(customerid).exec();

    if (existingCustomer){
        return res.status(400).json('Duplicate customer id');
    }

    const customer = new Customer({
        customerName, 
        preferName, 
        email, 
        phone
    });
    await customer.save();
    return res.json(customer);//根据需求返回
}

async function getAllCustomers(req, res){
    const customers = await Customer.find().exec();
    return res.json(customers);
}

async function getCustomer(req, res){
    const {customerid} = req.params; 

    const customer = await Customer.findById(customerid)
    .populate('orders', 'customerName businessName')
    .exec();
    
    if(!customer){
        return res.status(404).json('customer not found');
    }
    return res.json(customer);
}

async function updateCustomer(req, res){
    const {customerid} = req.params;
    const {customerName, preferName, email, phone} = req.body;

    const newCustomer = await Customer.findByIdAndUpdate(
        customerid,
        {customerName, preferName, email, phone},
        {new:true}
    ).exec();
    if (!newCustomer){
        return res.status(404).json('customer not found');
    }
    return res.json(newCustomer);
}

async function deleteCustomer(req, res){
    const {customerid } = req.params;
  const customer = await Customer.findByIdAndDelete(customerid).exec();
  if (!customer) {
    return res.status(404).json('customer not found');
  }
//   await Customer.updateMany(
//     {
//         customerid:{$in: customer._orders}
//     },
//     {
//         $pull:{orders: customer._orders}
//     }  
//   );

  return res.sendStatus(200);
}

// async function addOrder(req, res){
//     const {orderid, customerid} = req.params;
//     const order = await Order.findById(orderid).exec();
//     const customer = await Customer.findById(customerid).exec();
//     if (!customer || !order){
//         return res.status(404).json('order or customer not found');
//     }
//     customer.orders.addToSet(order.orderid);//避免出现重复的order
//     await order.save();
//     return res.json(customer);
// }

// async function deleteOrder(req, res){
//     const {orderid, customerid} = req.params;
//     const order = await Order.findById(orderid).exec();
//     const customer = await Customer.findById(customerid).exec();
//     if (!customer || !order){
//         return res.status(404).json('order or customer not found');
//     }
//     const oldCount = customer.orders.length;
//     customer.orders.pull(customer.customerid);
//     if (customer.orders.length === oldCount) {
//         return res.status(404).json('customer does not exist');
//     }

//     customer.orders.pull(customer.customerid);
//     await 
// }

module.exports = {
    addCustomer,
    getAllCustomers,
    getCustomer,
    updateCustomer,
    deleteCustomer
  };
