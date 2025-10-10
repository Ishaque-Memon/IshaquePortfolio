import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Admin from '../models/Admin.js';
import connectDB from '../config/db.js';
import ROLES from '../constant/roles.js';

dotenv.config();

const createDefaultAdmin = async () => {
  try {
    await connectDB();

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: 'admin@portfolio.com' });

    if (existingAdmin) {
      console.log('⚠️  Admin user already exists!');
      console.log('📧 Email:', existingAdmin.email);
      console.log('');
      console.log('To reset password, delete the admin from MongoDB and run this script again.');
      process.exit(0);
    }

    // Create admin user
    const admin = await Admin.create({
      name: 'Admin',
      email: 'admin@portfolio.com',
      password: 'admin123',
      role: ROLES.ADMIN,
      isActive: true
    });

    console.log('');
    console.log('✅ Admin user created successfully!');
    console.log('='.repeat(50));
    console.log('📧 Email:', admin.email);
    console.log('🔑 Password: admin123');
    console.log('👤 Role:', admin.role);
    console.log('='.repeat(50));
    console.log('');
    console.log('⚠️  IMPORTANT: Change the password after first login!');
    console.log('');
    console.log('Login URL: http://localhost:5000/api/admin/login');
    console.log('');

    process.exit(0);

  } catch (error) {
    console.error('❌ Error creating admin user:', error.message);
    process.exit(1);
  }
};

createDefaultAdmin();
