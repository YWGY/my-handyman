const express = require('express');
const {
  getAllCustomers,
  addCustomer,
  updateCustomer,
  deleteCustomer,
  getCustomer,
  addOrder,
  deleteOrder
} = require('../controllers/customer');
const router = express.Router();

router.get('/', getAllCustomers);
router.get('/:customerid', getCustomer);
router.post('/', addCustomer);
router.put('/:customerid', updateCustomer);
router.delete('/:customerid', deleteCustomer);
router.post('/:customerid/orders/:orderid', addOrder);
router.delete('/:customerid/orders/:orderid', deleteOrder);

module.exports = router;