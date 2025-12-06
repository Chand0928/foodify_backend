const express = require('express');
const router = express.Router();
const { getCart, addToCart, removeFromCart, clearCart } = require('../controllers/cartController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getCart);
router.post('/', protect, addToCart);
router.delete('/:id', protect, removeFromCart); // id is cart_item id
router.delete('/', protect, clearCart);

module.exports = router;
