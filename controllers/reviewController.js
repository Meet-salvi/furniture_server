const Review = require('../models/Review');
const Product = require('../models/Product');

// @desc    Create new review
// @route   POST /reviews
// @access  Private
const createProductReview = async (req, res) => {
    const { productId, rating, comment } = req.body;

    try {
        const product = await Product.findById(productId);

        if (product) {
            const alreadyReviewed = await Review.findOne({
                product: productId,
                user: req.user.id
            });

            if (alreadyReviewed) {
                res.status(400).json({ message: 'Product already reviewed' });
                return;
            }

            const review = new Review({
                rating: Number(rating),
                comment,
                product: productId,
                user: req.user.id,
            });

            await review.save();

            // Update product rating
            const reviews = await Review.find({ product: productId });
            product.numReviews = reviews.length;
            product.rating =
                reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length;

            await product.save();
            res.status(201).json({ message: 'Review added' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message || 'Server Error' });
    }
};

module.exports = {
    createProductReview,
};
