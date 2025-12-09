const express = require('express');
const router = express.Router();
const { createOrder, getUserOrders, getAllOrders, updateOrderStatus, deleteOrder } = require('../controllers/orderController');
const { protect, admin } = require('../middleware/authMiddleware');

router.post('/', protect, createOrder);
router.get('/', protect, getUserOrders);
router.get('/all', protect, admin, getAllOrders);
router.put('/:id/status', protect, admin, updateOrderStatus);
router.delete('/:id', protect, deleteOrder);

module.exports = router;
