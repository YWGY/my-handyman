const express = require('express');
const {
  getAllBusinesses,
  addBusiness,
  updateBusiness,
  deleteBusiness,
  getBusiness,
  addCategory,
  deleteCategory
} = require('../controllers/business');


const router = express.Router();

router.get('/', getAllBusinesses);
router.get('/:businessid', getBusiness);
router.post('/', addBusiness);
router.put('/:businessid', updateBusiness);
router.delete('/:businessid', deleteBusiness);

router.put('/:categoryid', addCategory);
router.delete('/:categoryid', deleteCategory);

module.exports = router;