require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Event = require('./models/Event');

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
    // await Event.deleteMany({});
    // console.log('Cleared existing data');

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
    const createdAdmins = [];
    for (const admin of admins) {
      const existingAdmin = await User.findOne({ email: admin.email });
      if (!existingAdmin) {
        const newAdmin = await User.create(admin);
        createdAdmins.push(newAdmin);
        console.log(`✅ Created ${admin.role}: ${admin.email}`);
      } else {
        createdAdmins.push(existingAdmin);
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

    // Create sample events if none exist
    const existingEvents = await Event.countDocuments();
    if (existingEvents === 0 && createdAdmins.length > 0) {
      const sampleEvents = [
        {
          name: 'Tech Talk: AI & Machine Learning',
          description: 'Join us for an exciting session on Artificial Intelligence and Machine Learning. Industry experts will share insights on the latest trends and technologies.',
          date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week from now
          location: 'Auditorium A, Main Block',
          category: 'technical',
          maxAttendees: 100,
          createdBy: createdAdmins[0]._id,
          status: 'published'
        },
        {
          name: 'Cultural Fest 2024',
          description: 'Experience the vibrant colors of our annual cultural festival. Dance, music, drama, and much more!',
          date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 2 weeks from now
          location: 'Open Ground',
          category: 'cultural',
          maxAttendees: 500,
          createdBy: createdAdmins[1]._id,
          status: 'published'
        },
        {
          name: 'Inter-College Cricket Tournament',
          description: 'Show your cricket skills in our inter-college tournament. Teams of 11 players required.',
          date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days from now
          location: 'College Cricket Ground',
          category: 'sports',
          maxAttendees: 200,
          createdBy: createdAdmins[2]._id,
          status: 'published'
        },
        {
          name: 'Web Development Workshop',
          description: 'Learn modern web development with React, Node.js, and MongoDB. Hands-on coding session with experts.',
          date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
          location: 'Computer Lab 1',
          category: 'workshop',
          maxAttendees: 50,
          createdBy: createdAdmins[0]._id,
          status: 'published'
        },
        {
          name: 'Career Guidance Seminar',
          description: 'Get insights from industry leaders about career opportunities in engineering and technology sectors.',
          date: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000), // 12 days from now
          location: 'Seminar Hall',
          category: 'seminar',
          maxAttendees: 150,
          createdBy: createdAdmins[1]._id,
          status: 'published'
        }
      ];

      for (const event of sampleEvents) {
        await Event.create(event);
        console.log(`✅ Created sample event: ${event.name}`);
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
    console.log('\n🌐 Start the server with: npm start');
    console.log('🌐 Open browser at: http://localhost:3000');

    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedData();
