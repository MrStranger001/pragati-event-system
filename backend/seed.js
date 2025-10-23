require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

const seedData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, { 
      useNewUrlParser: true, 
      useUnifiedTopology: true 
    });
    console.log('Connected to MongoDB');

    // Clear existing users (optional - comment this out if you don't want to clear)
    // await User.deleteMany({});
    // console.log('Cleared existing users');

    // Hash password
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const studentPassword = await bcrypt.hash('student123', 10);

    // Create 3 admin accounts
    const admins = [
      {
        name: 'Super Admin',
        email: 'superadmin@pragati.edu',
        password: hashedPassword,
        role: 'super_admin',
        emailVerified: true,
        energy: 100,
        points: 0
      },
      {
        name: 'Stall Admin',
        email: 'stalladmin@pragati.edu',
        password: hashedPassword,
        role: 'stall_admin',
        emailVerified: true,
        energy: 100,
        points: 0
      },
      {
        name: 'NCC Admin',
        email: 'nccadmin@pragati.edu',
        password: hashedPassword,
        role: 'ncc_admin',
        emailVerified: true,
        energy: 100,
        points: 0
      }
    ];

    // Create 3 test student accounts
    const students = [
      {
        name: 'Rahul Kumar',
        email: 'rahul.kumar@pragati.edu',
        password: studentPassword,
        phone: '+91 9876543210',
        role: 'student',
        notificationPreference: 'sms',
        emailVerified: true,
        energy: 100,
        points: 50
      },
      {
        name: 'Priya Sharma',
        email: 'priya.sharma@pragati.edu',
        password: studentPassword,
        phone: '+91 9876543211',
        role: 'student',
        notificationPreference: 'email',
        emailVerified: true,
        energy: 95,
        points: 75
      },
      {
        name: 'Amit Patel',
        email: 'amit.patel@pragati.edu',
        password: studentPassword,
        phone: '+91 9876543212',
        role: 'student',
        notificationPreference: 'sms',
        emailVerified: true,
        energy: 90,
        points: 60
      }
    ];

    // Insert admins
    for (const admin of admins) {
      const existingAdmin = await User.findOne({ email: admin.email });
      if (!existingAdmin) {
        await User.create(admin);
        console.log(`✅ Created ${admin.role}: ${admin.email}`);
      } else {
        console.log(`⚠️  ${admin.role} already exists: ${admin.email}`);
      }
    }

    // Insert students
    for (const student of students) {
      const existingStudent = await User.findOne({ email: student.email });
      if (!existingStudent) {
        await User.create(student);
        console.log(`✅ Created student: ${student.email}`);
      } else {
        console.log(`⚠️  Student already exists: ${student.email}`);
      }
    }

    console.log('\n🎉 Database seeded successfully!');
    console.log('\n📋 Admin Credentials:');
    console.log('Email: superadmin@pragati.edu | Password: admin123');
    console.log('Email: stalladmin@pragati.edu | Password: admin123');
    console.log('Email: nccadmin@pragati.edu | Password: admin123');
    console.log('\n📋 Student Credentials:');
    console.log('Email: rahul.kumar@pragati.edu | Password: student123');
    console.log('Email: priya.sharma@pragati.edu | Password: student123');
    console.log('Email: amit.patel@pragati.edu | Password: student123');

    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedData();
