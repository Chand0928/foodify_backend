const express = require('express');
const router = express.Router();
const { createOrder, getUserOrders, updateOrderStatus } = require('../controllers/orderController');
const { protect, admin } = require('../middleware/authMiddleware');

router.post('/', protect, createOrder);
router.get('/', protect, getUserOrders);
router.put('/:id/status', protect, admin, updateOrderStatus);

module.exports = router;
