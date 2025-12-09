const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('./models/User');
const Food = require('./models/Food');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

const seedData = async () => {
    try {
        await connectDB();

        // Clear existing data
        await User.deleteMany({});
        await Food.deleteMany({});
        console.log('Cleared existing data');

        // Create Admin User
        const adminPassword = await bcrypt.hash('admin123', 10);
        const admin = await User.create({
            username: 'admin',
            email: 'admin@foodify.com',
            password_hash: adminPassword,
            role: 'admin'
        });
        console.log('✅ Admin created:', admin.email);

        // Create Regular User
        const userPassword = await bcrypt.hash('user123', 10);
        const user = await User.create({
            username: 'testuser',
            email: 'user@foodify.com',
            password_hash: userPassword,
            role: 'user'
        });
        console.log('✅ User created:', user.email);

        // Create Sample Foods
        const foods = [
            {
                name: 'Margherita Pizza',
                description: 'Authentic Neapolitan pizza with San Marzano tomato sauce, fresh buffalo mozzarella, and basil',
                price: 12.99,
                category: 'Meals',
                image_url: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&q=80'
            },
            {
                name: 'Double Cheeseburger',
                description: 'Two smashed beef patties, American cheese, lettuce, tomato, pickles, and our signature sauce',
                price: 14.99,
                category: 'Meals',
                image_url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80'
            },
            {
                name: 'Chicken Caesar Salad',
                description: 'Crisp romaine hearts, shaved parmesan, grilled chicken breast, and house-made sourdough croutons',
                price: 11.99,
                category: 'Meals',
                image_url: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=800&q=80'
            },
            {
                name: 'Creamy Alfredo Pasta',
                description: 'Fettuccine pasta tossed in a rich parmesan cream sauce with garlic and herbs',
                price: 13.99,
                category: 'Meals',
                image_url: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&q=80'
            },
            {
                name: 'Loaded Nachos',
                description: 'Crispy tortilla chips topped with melted cheese, jalapeños, guacamole, salsa, and sour cream',
                price: 9.99,
                category: 'Snacks',
                image_url: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=800&q=80'
            },
            {
                name: 'Spicy Chicken Wings',
                description: 'Crispy wings tossed in your choice of buffalo or BBQ sauce, served with ranch dip',
                price: 10.99,
                category: 'Snacks',
                image_url: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=800&q=80'
            },
            {
                name: 'Sushi Platter',
                description: 'Assorted fresh sushi rolls including California roll, Spicy Tuna, and Salmon Nigiri',
                price: 18.99,
                category: 'Meals',
                image_url: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&q=80'
            },
            {
                name: 'Chocolate Lava Cake',
                description: 'Warm chocolate cake with a molten center, served with vanilla bean ice cream',
                price: 8.99,
                category: 'Desserts',
                image_url: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80'
            },
            {
                name: 'Strawberry Smoothie',
                description: 'Fresh strawberries blended with yogurt and honey for a refreshing treat',
                price: 5.99,
                category: 'Drinks',
                image_url: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=800&q=80'
            },
            {
                name: 'Iced Caramel Macchiato',
                description: 'Rich espresso layered with vanilla syrup, milk, and caramel drizzle',
                price: 4.99,
                category: 'Drinks',
                image_url: 'https://images.unsplash.com/photo-1517701604599-bb29b5c5090c?w=800&q=80'
            },
            {
                name: 'Tacos Al Pastor',
                description: 'Three soft corn tortillas filled with marinated pork, pineapple, onion, and cilantro',
                price: 11.99,
                category: 'Meals',
                image_url: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=800&q=80'
            },
            {
                name: 'Grilled Steak',
                description: 'Premium ribeye steak grilled to perfection, served with asparagus and mashed potatoes',
                price: 24.99,
                category: 'Meals',
                image_url: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800&q=80'
            }
        ];

        const createdFoods = await Food.insertMany(foods);
        console.log(`✅ Created ${createdFoods.length} food items`);

        console.log('\n📋 Login Credentials:');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('Admin:');
        console.log('  Email: admin@foodify.com');
        console.log('  Password: admin123');
        console.log('\nRegular User:');
        console.log('  Email: user@foodify.com');
        console.log('  Password: user123');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

        process.exit(0);
    } catch (error) {
        console.error('Seed error:', error);
        process.exit(1);
    }
};

seedData();
