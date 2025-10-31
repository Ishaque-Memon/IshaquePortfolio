import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Admin from '../models/Admin.js';
import connectDB from '../config/db.js';
import ROLES from '../constants/roles.js';

dotenv.config();

const createDefaultAdmin = async () => {
  try {
    await connectDB();

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: 'admin@portfolio.com' });

    if (existingAdmin) {
  // ...removed console.log('⚠️  Admin user already exists!');
  // ...removed console.log('📧 Email:', existingAdmin.email);
  // ...removed console.log('');
  // ...removed console.log('To reset password, delete the admin from MongoDB and run this script again.');
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

  // ...removed console.log('');
  // ...removed console.log('✅ Admin user created successfully!');
  // ...removed console.log('='.repeat(50));
  // ...removed console.log('📧 Email:', admin.email);
  // ...removed console.log('🔑 Password: admin123');
  // ...removed console.log('👤 Role:', admin.role);
  // ...removed console.log('='.repeat(50));
  // ...removed console.log('');
  // ...removed console.log('⚠️  IMPORTANT: Change the password after first login!');
  // ...removed console.log('');
  // ...removed console.log('Login URL: http://localhost:5000/api/admin/login');
  // ...removed console.log('');

    process.exit(0);

  } catch (error) {
  // ...removed console.error('❌ Error creating admin user:', error.message);
    process.exit(1);
  }
};

createDefaultAdmin();
