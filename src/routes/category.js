const express = require('express');
const {
  getAllCategories,
  addCategory,
  updateCategory,
  deleteCategory,
  getCategory
} = require('../controllers/category');

const {
  addBusiness,
  deleteBusiness
}=require('../controllers/business')
const router = express.Router();

router.get('/', getAllCategories);
router.get('/:categoryid', getCategory);
router.post('/', addCategory);
router.put('/:categoryid', updateCategory);
router.delete('/:categoryid', deleteCategory);
router.post('/:categoryid/businesses/:businessid', addBusiness);
router.delete('/:categoryid/businesses/:businessid', deleteBusiness);

module.exports = router;