const Food = require('../models/Food');

exports.getAllFoods = async (req, res) => {
    try {
        const { search, category } = req.query;
        let query = {};

        if (search) {
            query.name = { $regex: search, $options: 'i' };
        }
        if (category && category !== 'All') {
            query.category = category;
        }

        const foods = await Food.find(query);
        res.json(foods);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getFoodById = async (req, res) => {
    try {
        const food = await Food.findById(req.params.id);
        if (!food) {
            return res.status(404).json({ message: 'Food not found' });
        }
        res.json(food);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.createFood = async (req, res) => {
    const { name, description, price, image_url, category } = req.body;
    try {
        const food = await Food.create({
            name, description, price, image_url, category
        });
        res.status(201).json(food);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateFood = async (req, res) => {
    const { name, description, price, image_url, category } = req.body;
    try {
        await Food.findByIdAndUpdate(req.params.id, {
            name, description, price, image_url, category
        });
        res.json({ message: 'Food updated' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.deleteFood = async (req, res) => {
    try {
        await Food.findByIdAndDelete(req.params.id);
        res.json({ message: 'Food deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

