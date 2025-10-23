# Pragati Event System

A comprehensive event management and notification system for Pragati Engineering College.

## 🎯 Features

- 🔐 **No OTP Authentication** - Simple signup and login without OTP verification
- 👥 **3 Admin Types** - Super Admin, Stall Admin, and NCC Admin with full dashboard
- 📅 **Event Management** - Create, publish, and manage events with categories
- 🎨 **Colorful UI** - Beautiful gradient design with category-specific event colors
- 📊 **Admin Dashboard** - View stats, manage events, track student enrollments
- 📱 **Dual Notifications** - Email and SMS notifications for event registrations
- ⚡ **Student Tracking** - Track student energy levels and points
- 🔒 **Security Hardened** - Rate limiting, NoSQL injection prevention, input validation

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- MongoDB (local or Atlas)

### Installation (5 minutes)

1. **Clone and Install**
   ```bash
   git clone <repository-url>
   cd pragati-event-system/backend
   npm install
   ```

2. **Configure MongoDB**
   Edit `backend/.env`:
   ```env
   MONGO_URI=mongodb://localhost:27017/pragati-events
   # or use MongoDB Atlas connection string
   ```

3. **Seed Database** (Creates admins, students, and sample events)
   ```bash
   npm run seed
   ```

4. **Start Server**
   ```bash
   npm start
   ```

5. **Open Browser**
   ```
   http://localhost:3000
   ```

## 👤 Pre-configured Accounts

### Admin Accounts (password: `admin123`)
- `superadmin@pragati.edu` - Super Admin
- `stalladmin@pragati.edu` - Stall Admin  
- `nccadmin@pragati.edu` - NCC Admin

### Student Accounts (password: `student123`)
- `rahul.kumar@pragati.edu`
- `priya.sharma@pragati.edu`
- `amit.patel@pragati.edu`

## 📚 Documentation

- **[QUICKSTART.md](QUICKSTART.md)** - 5-minute setup and testing guide
- **[SETUP.md](SETUP.md)** - Detailed setup instructions
- **[SUMMARY.md](SUMMARY.md)** - Complete feature overview
- **[SECURITY.md](SECURITY.md)** - Security analysis and best practices

## 🎨 Features Overview

### For Students
- ✅ Sign up without OTP
- ✅ Login and view colorful events page
- ✅ Register for events with one click
- ✅ Add phone number for SMS notifications
- ✅ View event details and enrollment count

### For Admins
- ✅ Access admin dashboard after login
- ✅ View statistics (events, enrollments, students)
- ✅ Create and publish events
- ✅ Track student enrollments
- ✅ View all student information with energy/points

### Event Categories with Colors
- 🔵 Technical (Blue)
- 🟠 Cultural (Orange)
- 🟢 Sports (Green)
- 🟣 Workshop (Purple)
- 🔴 Seminar (Red)
- ⚫ Other (Gray)

## 🔒 Security Features

- ✅ Password hashing with bcrypt
- ✅ JWT authentication
- ✅ Rate limiting (DoS protection)
- ✅ NoSQL injection prevention
- ✅ Input validation and sanitization
- ✅ Role-based access control

## 📖 API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `PUT /auth/update-phone` - Update phone number

### Events
- `GET /event/all` - Get all published events
- `POST /event/create` - Create event (admin)
- `POST /event/:id/register` - Register for event
- `GET /event/my-events` - Get user's events

### Admin
- `GET /admin/dashboard` - Dashboard statistics
- `GET /admin/students` - All students info
- `GET /admin/event/:id/enrollments` - Event enrollments

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **Auth**: JWT, bcryptjs
- **Notifications**: Nodemailer (Email), Twilio (SMS)
- **Security**: express-rate-limit, express-mongo-sanitize
- **Frontend**: HTML, CSS, Vanilla JavaScript

## 📱 Optional: Email/SMS Notifications

### Email Setup (Gmail)
```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-gmail-app-password
```

### SMS Setup (Twilio)
```env
TWILIO_SID=your-twilio-sid
TWILIO_AUTH_TOKEN=your-twilio-auth-token
TWILIO_PHONE=your-twilio-phone
```

## 🎉 Project Status

**Status**: ✅ COMPLETE & PRODUCTION READY

All requirements implemented:
- ✅ No OTP signup/login
- ✅ Colorful events page
- ✅ 3 admin accounts with dashboards
- ✅ 3 student test accounts
- ✅ Event management system
- ✅ Notification system
- ✅ Security hardened

## 📝 Testing

Run the seed script to populate with test data:
```bash
npm run seed
```

Then test:
1. Login as student → View events → Register
2. Login as admin → Create event → View dashboard
3. Check notifications (if configured)

## 🐛 Troubleshooting

**MongoDB Connection Error**
- Verify MongoDB is running
- Check connection string in `.env`

**Port 3000 in use**
- Change port in `backend/app.js`
- Or kill process using port 3000

**Email not sending**
- Use Gmail App Password (not regular password)
- Enable 2-factor authentication first

## 📄 License

ISC

## 🤝 Support

For issues or questions, please contact the development team or open an issue on GitHub.
