const Food = require('../models/Food');

exports.getAllFoods = async (req, res) => {
    try {
        const {
            search,
            category,
            page = 1,
            limit = 12,
            sortBy = 'name',
            order = 'asc'
        } = req.query;

        let query = {};

        if (search) {
            query.name = { $regex: search, $options: 'i' };
        }
        if (category && category !== 'All') {
            query.category = category;
        }

        // Calculate pagination
        const skip = (parseInt(page) - 1) * parseInt(limit);

        // Build sort object
        const sortOrder = order === 'asc' ? 1 : -1;
        const sortObj = { [sortBy]: sortOrder };

        // Execute query with pagination and sorting
        const foods = await Food.find(query)
            .sort(sortObj)
            .limit(parseInt(limit))
            .skip(skip);

        // Get total count for pagination
        const total = await Food.countDocuments(query);

        res.json({
            foods,
            pagination: {
                total,
                page: parseInt(page),
                limit: parseInt(limit),
                pages: Math.ceil(total / parseInt(limit))
            }
        });
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

