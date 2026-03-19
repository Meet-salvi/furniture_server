const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const Category = require('./models/Category');

dotenv.config();

const categories = [
    { name: 'Sofa', description: 'Luxury living room seating' },
    { name: 'Bed', description: 'Premium bedroom comfort' },
    { name: 'Table', description: 'Elegant dining and study tables' },
    { name: 'Chair', description: 'Ergonomic and stylish chairs' },
    { name: 'Decor', description: 'Minimalist home decor' }
];

const sampleProducts = [
    // Sofa Category (Category 0)
    {
        name: 'Luxe Velvet Sofa',
        description: 'A premium deep-blue velvet sofa with gold-finished legs.',
        price: 45000,
        material: 'Velvet, Oak Wood',
        color: ['Midnight Blue', 'Emerald Green'],
        images: ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800'],
        stock: 10, rating: 4.8, numReviews: 24, catIndex: 0
    },
    {
        name: 'L-Shaped Sectional Sofa',
        description: 'Large grey sectional sofa for family gatherings.',
        price: 75000,
        material: 'Polyester Blend, Pine Wood',
        color: ['Light Grey', 'Charcoal'],
        images: ['https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=800'],
        stock: 5, rating: 4.7, numReviews: 18, catIndex: 0
    },
    {
        name: 'Chesterfield Classic Sofa',
        description: 'Iconic rolled arms and button-tufted upholstery.',
        price: 55000,
        material: 'Leather, Ash Wood',
        color: ['Cognac', 'Dark Brown'],
        images: ['https://images.unsplash.com/photo-1540574163026-643ea20ade25?auto=format&fit=crop&q=80&w=800'],
        stock: 7, rating: 4.9, numReviews: 32, catIndex: 0
    },
    {
        name: 'Modern Loveseat',
        description: 'Compact sofa for smaller spaces with premium cushioning and minimalist design.',
        price: 28000,
        material: 'Linen, Rubberwood',
        color: ['Beige', 'Cream'],
        images: [
            'https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=800'
        ],
        stock: 12, rating: 4.5, numReviews: 14, catIndex: 0
    },
    {
        name: 'Reclining Theater Sofa',
        description: 'Electric recliners with USB ports.',
        price: 95000,
        material: 'Faux Leather',
        color: ['Black', 'Dark Grey'],
        images: ['https://images.unsplash.com/photo-1550254478-ead40cc54513?auto=format&fit=crop&q=80&w=800'],
        stock: 4, rating: 4.6, numReviews: 10, catIndex: 0
    },

    // Bed Category (Category 1)
    {
        name: 'Scandinavian Oak Bed',
        description: 'Clean lines and natural oak texture. Perfect for a cozy, minimalist bedroom.',
        price: 58000,
        material: 'Solid Oak',
        color: ['Natural Oak', 'Smoked Grey'],
        images: ['https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&q=80&w=800'],
        stock: 5, rating: 4.9, numReviews: 12, catIndex: 1
    },
    {
        name: 'Tufted Wingback Bed',
        description: 'Elegant headboard with wings for deep comfort.',
        price: 48000,
        material: 'Velvet, Metal',
        color: ['Grey', 'Dusty Rose'],
        images: ['https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=800'],
        stock: 8, rating: 4.8, numReviews: 21, catIndex: 1
    },
    {
        name: 'Modern Platform Bed',
        description: 'Low profile bed with integrated storage.',
        price: 42000,
        material: 'Engineered Wood',
        color: ['Walnut', 'Oak'],
        images: ['https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=800'],
        stock: 10, rating: 4.6, numReviews: 15, catIndex: 1
    },
    {
        name: 'Vintage Iron Bed Frame',
        description: 'Classic wrought iron design with durable finish.',
        price: 18000,
        material: 'Iron',
        color: ['Black', 'Bronze'],
        images: ['https://images.unsplash.com/photo-1505692795793-20f545a60ec2?auto=format&fit=crop&q=80&w=800'],
        stock: 15, rating: 4.4, numReviews: 9, catIndex: 1
    },
    {
        name: 'King Size Poster Bed',
        description: 'Grand canopy bed frame for a luxury feel.',
        price: 85000,
        material: 'Teak Wood',
        color: ['Dark Oak'],
        images: ['https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=800'],
        stock: 3, rating: 5.0, numReviews: 5, catIndex: 1
    },

    // Table Category (Category 2)
    {
        name: 'Minimalist Marble Table',
        description: 'Italian Carrara marble top with steel base.',
        price: 32000,
        material: 'Carrara Marble, Steel',
        color: ['White Marble', 'Black Marble'],
        images: ['https://images.unsplash.com/photo-1604578762246-41134e37f9cc?auto=format&fit=crop&q=80&w=800'],
        stock: 8, rating: 4.7, numReviews: 15, catIndex: 2
    },
    {
        name: 'Rustic Picnic Dining Table',
        description: 'Large wooden table for family dining.',
        price: 25000,
        material: 'Pine Wood',
        color: ['Walnut'],
        images: ['https://images.unsplash.com/photo-1511210112837-580d6205844e?auto=format&fit=crop&q=80&w=800'],
        stock: 6, rating: 4.5, numReviews: 11, catIndex: 2
    },
    {
        name: 'Glass Top Coffee Table',
        description: 'Modern glass table with wooden legs.',
        price: 12000,
        material: 'Tempered Glass, Ash Wood',
        color: ['Clear'],
        images: ['https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=800'],
        stock: 20, rating: 4.6, numReviews: 28, catIndex: 2
    },
    {
        name: 'Adjustable Standing Desk',
        description: 'Electric height adjustable desk for home office.',
        price: 38000,
        material: 'Steel, MDF',
        color: ['Black', 'White'],
        images: ['https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&q=80&w=800'],
        stock: 15, rating: 4.8, numReviews: 45, catIndex: 2
    },
    {
        name: 'Compact Nesting Tables',
        description: 'Set of 3 space-saving side tables.',
        price: 8500,
        material: 'Oak Wood',
        color: ['Natural'],
        images: ['https://images.unsplash.com/photo-1581428982868-e410dd047a90?auto=format&fit=crop&q=80&w=800'],
        stock: 30, rating: 4.4, numReviews: 17, catIndex: 2
    },

    // Chair Category (Category 3)
    {
        name: 'Ergonomic Office Chair',
        description: 'Adjustable lumbar support and high mesh back.',
        price: 15000,
        material: 'Mesh, Nylon',
        color: ['Black', 'Grey'],
        images: ['https://images.unsplash.com/photo-1505797149-43b0069ec26b?auto=format&fit=crop&q=80&w=800'],
        stock: 25, rating: 4.8, numReviews: 56, catIndex: 3
    },
    {
        name: 'Velvet Dining Chair',
        description: 'Soft velvet upholstery with metal legs.',
        price: 6500,
        material: 'Velvet, Iron',
        color: ['Emerald', 'Gold'],
        images: ['https://images.unsplash.com/photo-1580480055273-228ff5388ef8?auto=format&fit=crop&q=80&w=800'],
        stock: 40, rating: 4.7, numReviews: 34, catIndex: 3
    },
    {
        name: 'Eames Style Lounge Chair',
        description: 'Classic mid-century modern design with superior comfort.',
        price: 45000,
        material: 'Plywood, Leather',
        color: ['Black Leather'],
        images: ['https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=800'],
        stock: 5, rating: 4.9, numReviews: 12, catIndex: 3
    },
    {
        name: 'Bar Stool High Chair',
        description: 'Sleek metal bar stools for your kitchen or bar.',
        price: 4500,
        material: 'Steel',
        color: ['Black', 'Rust'],
        images: ['https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=800'],
        stock: 35, rating: 4.3, numReviews: 22, catIndex: 3
    },
    {
        name: 'Outdoor Adirondack Chair',
        description: 'Weather-resistant wooden chair for patio or lawn.',
        price: 9500,
        material: 'Cedar Wood',
        color: ['Natural', 'White'],
        images: ['https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?auto=format&fit=crop&q=80&w=800'],
        stock: 12, rating: 4.6, numReviews: 19, catIndex: 3
    },

    // Decor Category (Category 4)
    {
        name: 'Minimalist Wall Clock',
        description: 'Sleek wooden wall clock for any room.',
        price: 3500,
        material: 'Wood',
        color: ['Light Wood'],
        images: ['https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?auto=format&fit=crop&q=80&w=800'],
        stock: 50, rating: 4.7, numReviews: 31, catIndex: 4
    },
    {
        name: 'Ceramic Vase Set',
        description: 'Set of 2 modern matte vases for flowers or decor.',
        price: 2800,
        material: 'Ceramic',
        color: ['Matte White', 'Terracotta'],
        images: ['https://images.unsplash.com/photo-1581783898377-1c85bf937427?auto=format&fit=crop&q=80&w=800'],
        stock: 45, rating: 4.5, numReviews: 15, catIndex: 4
    },
    {
        name: 'Abstract Canvas Art',
        description: 'Large abstract painting for a modern touch.',
        price: 8500,
        material: 'Canvas, Wood Frame',
        color: ['Multicolor'],
        images: ['https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&q=80&w=800'],
        stock: 10, rating: 4.8, numReviews: 8, catIndex: 4
    },
    {
        name: 'Cotton Throw Pillows',
        description: 'Pair of textured accent pillows for your sofa.',
        price: 1500,
        material: 'Cotton',
        color: ['Mustard', 'Navy'],
        images: ['https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80&w=800'],
        stock: 100, rating: 4.4, numReviews: 42, catIndex: 4
    },
    {
        name: 'Indoor Potted Plant',
        description: 'Low-maintenance Fiddle Leaf Fig for green vibes.',
        price: 2200,
        material: 'Organic',
        color: ['Green'],
        images: ['https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&q=80&w=800'],
        stock: 30, rating: 4.9, numReviews: 25, catIndex: 4
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
        const productsWithCategories = sampleProducts.map((p) => {
            const { catIndex, ...rest } = p;
            return {
                ...rest,
                category: createdCategories[catIndex]._id
            };
        });

        await Product.insertMany(productsWithCategories);
        console.log('Sample furniture data (5 per category) imported successfully!');

        process.exit();
    } catch (error) {
        console.error('Error importing data:', error);
        process.exit(1);
    }
};

importData();
