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
        const orders = await Order.find({ user: req.user.id }).sort({ created_at: -1 });
        res.json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateOrderStatus = async (req, res) => {
    const { status } = req.body;
    try {
        await Order.findByIdAndUpdate(req.params.id, { status });
        res.json({ message: 'Order status updated' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
