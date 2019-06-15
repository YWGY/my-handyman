const express = require('express');
const {
  getAllOrders,
  addOrder,
  updateOrder,
  deleteOrder,
  getOrder,
} = require('../controllers/order');
const router = express.Router();

router.get('/', getAllOrders);
router.get('/:orderid', getOrder);
router.post('/', addOrder);
router.put('/:orderid', updateOrder);
router.delete('/:orderid', deleteOrder);

module.exports = router;