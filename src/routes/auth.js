const express = require('express');
const {addUser} = require('../controllers/auth');

const router = express.Router();

router.post('/', loginUser);

module.exports = router;