const mongoose = require('mongoose');
require('dotenv').config();
require('./models/Category');
const Product = require('./models/Product');

mongoose.connect(process.env.MONGO_URI).then(async () => {
    try {
        const products = await Product.find();
        console.log(`Found ${products.length} products to update.`);

        for (const product of products) {
            // Convert price to realistic Rupees (multiplying by 80 and rounding)
            // If it's already large (e.g. > 1000), maybe it's already in Rupees? 
            // Looking at previous output, prices are like 298, 89. Definitely USD.
            if (product.price < 5000) {
                product.price = Math.round(product.price * 82);
            }

            // Sync image count with color count as requested
            // "only avaliable in black or brwon product so image are two only not extra image"
            if (product.color && product.color.length > 0) {
                product.images = product.images.slice(0, product.color.length);
            }

            await product.save();
        }
        console.log('SUCCESS: Updated all products to Rupees and synced images with colors.');
    } catch (error) {
        console.error('ERROR during update:', error);
    } finally {
        process.exit(0);
    }
});
