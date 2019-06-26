const express = require('express');
const {
  getAllBusinesses,
  addBusiness,
  updateBusiness,
  deleteBusiness,
  getBusiness,
} = require('../controllers/business');

const {
  addCategory,
  deleteCategory
} = require('../controllers/category');

// const {
//     addOrder,
//     deleteOrder
// } = require('../controllers/order');

const router = express.Router();

router.get('/', getAllBusinesses);
router.get('/:businessid', getBusiness);
router.post('/', addBusiness);
router.put('/:businessid', updateBusiness);
router.delete('/:businessid', deleteBusiness);

// router.put('/:orderid', addOrder);
// router.delete('/:orderid', deleteOrder);

router.put('/:categoryid', addCategory);
router.delete('/:categoryid', deleteCategory);

module.exports = router;