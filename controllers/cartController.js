const CartItem = require('../models/CartItem');

exports.getCart = async (req, res) => {
    try {
        const cartItems = await CartItem.find({ user: req.user.id }).populate('food');

        // Transform to match previous structure (flattening the food details)
        const formattedItems = cartItems.map(item => {
            // Handle case where food might have been deleted but cart item remains
            if (!item.food) return null;

            return {
                id: item.id, // cart item id
                quantity: item.quantity,
                name: item.food.name,
                price: item.food.price,
                image_url: item.food.image_url,
                food_id: item.food.id
            };
        }).filter(item => item !== null);

        res.json(formattedItems);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.addToCart = async (req, res) => {
    const { foodId, quantity } = req.body;
    const qty = quantity || 1;

    try {
        let cartItem = await CartItem.findOne({ user: req.user.id, food: foodId });

        if (cartItem) {
            cartItem.quantity += qty;
            await cartItem.save();
        } else {
            await CartItem.create({
                user: req.user.id,
                food: foodId,
                quantity: qty
            });
        }
        res.json({ message: 'Item added to cart' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.removeFromCart = async (req, res) => {
    try {
        await CartItem.findByIdAndDelete(req.params.id);
        res.json({ message: 'Item removed' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.clearCart = async (req, res) => {
    try {
        await CartItem.deleteMany({ user: req.user.id });
        res.json({ message: 'Cart cleared' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

