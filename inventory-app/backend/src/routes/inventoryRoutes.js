const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/inventoryController');
router.post('/', ctrl.createInventory);
router.get('/', ctrl.getGroupedInventory);
module.exports = router;