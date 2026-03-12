const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    material: { type: String, required: true },
    color: { type: [String], required: true },
    images: { type: [String], required: true },
    rating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
    stock: { type: Number, required: true, default: 0 }
}, {
    timestamps: true
});

module.exports = mongoose.model('Product', productSchema);
