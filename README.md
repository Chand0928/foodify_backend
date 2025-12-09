Foodify Backend – Smart Food Ordering System API

Foodify Backend is a Node.js + Express.js REST API built to power a smart and seamless food ordering experience for college canteens and local restaurants.
It handles authentication, menu management, orders, carts, payments, and admin operations.

🚀 Features
🔐 Authentication & Authorization

User signup & login (JWT-based)

Password hashing with bcrypt

Role-based access: User / Admin

🍔 Menu Management (Admin)

Add, update, delete food items

Manage categories, prices, and images

🛒 Cart & Orders

Add items to cart

View cart

Place orders

Order history

📦 Real-Time Order Tracking

Order status flow:
Pending → Preparing → Ready → Completed

💳 Payments (Optional Integration)

Razorpay / Stripe

🏗️ Tech Stack
Layer	Technologies
Server	Node.js, Express.js
Database	MySQL
Auth	JWT, bcrypt
Hosting	Render / Railway
ORM (optional)	Sequelize / Prisma
