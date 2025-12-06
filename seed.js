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
                description: 'Classic pizza with tomato sauce, mozzarella, and basil',
                price: 12.99,
                category: 'Pizza',
                image_url: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400'
            },
            {
                name: 'Cheeseburger',
                description: 'Juicy beef patty with cheese, lettuce, and tomato',
                price: 9.99,
                category: 'Burgers',
                image_url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400'
            },
            {
                name: 'Caesar Salad',
                description: 'Fresh romaine lettuce with Caesar dressing and croutons',
                price: 8.99,
                category: 'Salads',
                image_url: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400'
            },
            {
                name: 'Chicken Pasta',
                description: 'Creamy pasta with grilled chicken and vegetables',
                price: 14.99,
                category: 'Pasta',
                image_url: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400'
            },
            {
                name: 'Chocolate Cake',
                description: 'Rich chocolate cake with chocolate frosting',
                price: 6.99,
                category: 'Desserts',
                image_url: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400'
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
