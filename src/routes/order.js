const express = require('express');
const {
  getAllOrders,
  addOrder,
  updateOrder,
  deleteOrder,
  getOrder,
  addCategory,
  deleteCatgory
} = require('../controllers/order');
const router = express.Router();

router.get('/', getAllOrders);
router.get('/:orderid', getOrder);
router.post('/', addOrder);
router.put('/:orderid', updateOrder);
router.delete('/:orderid', deleteOrder);
router.post('/:customerid/orders/:orderid', addCategory);
router.delete('/:customerid/orders/:orderid', deleteCatgory);

module.exports = router;