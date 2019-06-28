const express = require('express');
const {
  getAllCustomers,
  addCustomer,
  updateCustomer,
  deleteCustomer,
  getCustomer,
} = require('../controllers/customer');

const router = express.Router();

router.get('/', getAllCustomers);
router.get('/:customerid', getCustomer);
router.post('/', addCustomer);
router.put('/:customerid', updateCustomer);
router.delete('/:customerid', deleteCustomer);

module.exports = router;