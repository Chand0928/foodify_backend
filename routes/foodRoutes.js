const express = require('express');
const router = express.Router();
const { getAllFoods, getFoodById, createFood, updateFood, deleteFood } = require('../controllers/foodController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/', getAllFoods);
router.get('/:id', getFoodById);
router.post('/', protect, admin, createFood);
router.put('/:id', protect, admin, updateFood);
router.delete('/:id', protect, admin, deleteFood);

module.exports = router;
