const express = require('express');
const router = express.Router();
const { addOrderItems, getMyOrders, cancelOrder } = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').post(protect, addOrderItems);
router.route('/:userId').get(protect, getMyOrders);
router.route('/:id/cancel').put(protect, cancelOrder);

module.exports = router;
