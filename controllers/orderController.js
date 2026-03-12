const Order = require('../models/Order');

// @desc    Create new order
// @route   POST /orders
// @access  Private
const addOrderItems = async (req, res) => {
    try {
        const {
            products,
            deliveryAddress,
            paymentMethod,
            totalPrice,
        } = req.body;

        if (products && products.length === 0) {
            res.status(400).json({ message: 'No order items' });
            return;
        } else {
            console.log("Creating order with products payload:", products);
            const order = new Order({
                products: products.map(p => ({
                    ...p,
                    product: p.product || p._id
                })),
                user: req.user.id,
                deliveryAddress,
                paymentMethod,
                totalPrice,
            });

            const createdOrder = await order.save();
            res.status(201).json(createdOrder);
        }
    } catch (error) {
        res.status(500).json({ message: error.message || 'Server Error' });
    }
};

// @desc    Get logged in user orders
// @route   GET /orders/:userId
// @access  Private
const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.params.userId }).populate('products.product', 'name images price');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Cancel an order
// @route   PUT /orders/:id/cancel
// @access  Private
const cancelOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (order) {
            // Check if the order belongs to the user
            if (order.user.toString() !== req.user.id) {
                res.status(401).json({ message: 'Not authorized to cancel this order' });
                return;
            }

            // Only allow cancellation if order is Pending or Processing
            if (order.status === 'Shipped' || order.status === 'Delivered') {
                res.status(400).json({ message: 'Order cannot be cancelled as it is already shipped or delivered' });
                return;
            }

            order.status = 'Cancelled';
            const updatedOrder = await order.save();
            res.json(updatedOrder);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message || 'Server Error' });
    }
};

module.exports = {
    addOrderItems,
    getMyOrders,
    cancelOrder,
};
