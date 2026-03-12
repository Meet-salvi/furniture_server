const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const Category = require('./models/Category');

dotenv.config();

const categories = [
    { name: 'Sofa', description: 'Luxury living room seating' },
    { name: 'Bed', description: 'Premium bedroom comfort' },
    { name: 'Table', description: 'Elegant dining and study tables' },
    { name: 'Chair', description: 'Ergonomic and stylish chairs' }
];

const sampleProducts = [
    {
        name: 'Luxe Velvet Sofa',
        description: 'A premium deep-blue velvet sofa with gold-finished legs, perfect for a modern living room.',
        price: 45000,
        material: 'Velvet, Oak Wood',
        color: ['Midnight Blue', 'Emerald Green'],
        images: [
            'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?auto=format&fit=crop&q=80&w=800'
        ],
        stock: 10,
        rating: 4.8,
        numReviews: 24
    },
    {
        name: 'Scandinavian Oak Bed',
        description: 'Clean lines and natural oak texture. Includes a premium headboard and integrated slats.',
        price: 58000,
        material: 'Solid Oak',
        color: ['Natural Oak', 'Smoked Grey'],
        images: [
            'https://images.unsplash.com/photo-1505693419148-4034b9fd3fa2?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=800'
        ],
        stock: 5,
        rating: 4.9,
        numReviews: 12
    },
    {
        name: 'Minimalist Marble Table',
        description: 'Italian Carrara marble top with a brushed steel base. Seats 6 comfortably.',
        price: 32000,
        material: 'Carrara Marble, Steel',
        color: ['White Marble', 'Black Marble'],
        images: [
            'https://images.unsplash.com/photo-1577146333195-660490651777?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=800'
        ],
        stock: 8,
        rating: 4.7,
        numReviews: 15
    }
];

const importData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB Atlas...');

        // Clear existing data
        await Product.deleteMany();
        await Category.deleteMany();
        console.log('Existing data cleared.');

        // Insert Categories
        const createdCategories = await Category.insertMany(categories);
        console.log('Categories imported.');

        // Insert Products with Category IDs
        const productsWithCategories = sampleProducts.map((product, index) => {
            return {
                ...product,
                category: createdCategories[index % createdCategories.length]._id
            };
        });

        await Product.insertMany(productsWithCategories);
        console.log('Sample furniture data imported successfully!');

        process.exit();
    } catch (error) {
        console.error('Error importing data:', error);
        process.exit(1);
    }
};

importData();
