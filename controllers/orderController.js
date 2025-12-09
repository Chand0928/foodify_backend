const Order = require('../models/Order');

exports.createOrder = async (req, res) => {
    try {
        const { items, totalAmount } = req.body;
        // items structure: [{ food_id, quantity, price }]
        // Mongoose schema expects: { food, quantity, price }

        const formattedItems = items.map(item => ({
            food: item.food_id,
            quantity: item.quantity,
            price: item.price
        }));

        const order = await Order.create({
            user: req.user.id,
            total_amount: totalAmount,
            status: 'Pending',
            items: formattedItems
        });

        res.status(201).json({ message: 'Order placed', orderId: order.id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getUserOrders = async (req, res) => {
    try {
        const { page = 1, limit = 10, sortBy = 'created_at', order = 'desc', status } = req.query;

        // Build query
        let query = { user: req.user.id };
        if (status && status !== 'All') {
            query.status = status;
        }

        // Calculate pagination
        const skip = (parseInt(page) - 1) * parseInt(limit);

        // Build sort object
        const sortOrder = order === 'asc' ? 1 : -1;
        const sortObj = { [sortBy]: sortOrder };

        // Execute query with pagination and sorting
        const orders = await Order.find(query)
            .sort(sortObj)
            .limit(parseInt(limit))
            .skip(skip);

        // Get total count for pagination
        const total = await Order.countDocuments(query);

        res.json({
            orders,
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

exports.getAllOrders = async (req, res) => {
    try {
        const { page = 1, limit = 10, sortBy = 'created_at', order = 'desc', status } = req.query;

        // Build query
        let query = {};
        if (status && status !== 'All') {
            query.status = status;
        }

        // Calculate pagination
        const skip = (parseInt(page) - 1) * parseInt(limit);

        // Build sort object
        const sortOrder = order === 'asc' ? 1 : -1;
        const sortObj = { [sortBy]: sortOrder };

        // Execute query with pagination and sorting
        const orders = await Order.find(query)
            .populate('user', 'name email')
            .sort(sortObj)
            .limit(parseInt(limit))
            .skip(skip);

        // Get total count for pagination
        const total = await Order.countDocuments(query);

        res.json({
            orders,
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

exports.updateOrderStatus = async (req, res) => {
    const { status } = req.body;
    try {
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.json({ message: 'Order status updated', order });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.deleteOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Only allow deletion if order is pending or cancelled
        if (order.status !== 'Pending' && order.status !== 'Cancelled') {
            return res.status(400).json({
                message: 'Cannot delete order with status: ' + order.status
            });
        }

        await Order.findByIdAndDelete(req.params.id);
        res.json({ message: 'Order deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
