const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/supplierController');
router.post('/', ctrl.createSupplier);
module.exports = router;