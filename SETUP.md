# Pragati Event System

A comprehensive event management and notification system for Pragati Engineering College.

## Features

- 🔐 **Authentication System** - No OTP required for signup, direct login after registration
- 👥 **User Roles** - Students and 3 types of admins (Super Admin, Stall Admin, NCC Admin)
- 📅 **Event Management** - Create, publish, and manage events
- 🎨 **Colorful UI** - Beautiful, responsive design with gradient colors
- 📊 **Admin Dashboard** - View stats, manage events, track student enrollments
- 📱 **Notifications** - Email and SMS notifications for event registrations
- ⚡ **Student Tracking** - Track student energy levels and points
- 📈 **Analytics** - View enrollment numbers and student information

## Pre-configured Accounts

### Admin Accounts
1. **Super Admin**
   - Email: `superadmin@pragati.edu`
   - Password: `admin123`
   - Can create/remove other admins

2. **Stall Admin**
   - Email: `stalladmin@pragati.edu`
   - Password: `admin123`

3. **NCC Admin**
   - Email: `nccadmin@pragati.edu`
   - Password: `admin123`

### Student Test Accounts
1. **Rahul Kumar**
   - Email: `rahul.kumar@pragati.edu`
   - Password: `student123`
   - Phone: +91 9876543210

2. **Priya Sharma**
   - Email: `priya.sharma@pragati.edu`
   - Password: `student123`
   - Phone: +91 9876543211

3. **Amit Patel**
   - Email: `amit.patel@pragati.edu`
   - Password: `student123`
   - Phone: +91 9876543212

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- Gmail account (for email notifications)
- Twilio account (optional, for SMS notifications)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd pragati-event-system
   ```

2. **Install dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Configure environment variables**
   
   Edit `backend/.env` file with your credentials:
   ```env
   MONGO_URI=mongodb://localhost:27017/pragati-events
   # or use MongoDB Atlas connection string
   
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-gmail-app-password
   
   # Optional: For SMS notifications
   TWILIO_SID=your-twilio-sid
   TWILIO_AUTH_TOKEN=your-twilio-auth-token
   TWILIO_PHONE=your-twilio-phone-number
   
   JWT_SECRET=pragati_event_system_secret_key_2024
   ```

   **Note:** For Gmail, you need to use an [App Password](https://support.google.com/accounts/answer/185833?hl=en), not your regular password.

4. **Seed the database** (Creates admin and test student accounts)
   ```bash
   npm run seed
   ```

5. **Start the server**
   ```bash
   npm start
   ```

6. **Access the application**
   
   Open your browser and navigate to: `http://localhost:3000`

## Usage

### For Students

1. **Sign Up** - Use any email ending with `@pragati.edu`
2. **Login** - Use your credentials (no OTP required)
3. **View Events** - See all published events with colorful cards
4. **Register for Events** - Click "Register" to enroll in events
5. **Add Phone Number** - Optionally add phone number for SMS notifications

### For Admins

1. **Login** - Use one of the pre-configured admin accounts
2. **Dashboard** - View stats on events, enrollments, and students
3. **Create Events** - Click "Create New Event" to publish new events
4. **Manage Events** - View event details and enrolled students
5. **Track Students** - See all students with their energy and points

## Project Structure

```
pragati-event-system/
├── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── adminController.js
│   │   └── eventController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   └── Event.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── adminRoutes.js
│   │   └── eventRoutes.js
│   ├── utils/
│   │   ├── otp.js
│   │   ├── sendEmail.js
│   │   └── sendSMS.js
│   ├── .env
│   ├── app.js
│   ├── seed.js
│   └── package.json
├── public/
│   ├── css/
│   │   └── styles.css
│   ├── login.html
│   ├── signup.html
│   ├── events.html
│   └── admin-dashboard.html
└── README.md
```

## API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `PUT /auth/update-phone` - Update phone number

### Events
- `GET /event/all` - Get all published events
- `GET /event/:id` - Get event details
- `POST /event/create` - Create new event (admin only)
- `POST /event/:id/register` - Register for event
- `GET /event/my-events` - Get user's registered events

### Admin
- `GET /admin/dashboard` - Get dashboard stats
- `GET /admin/students` - Get all students
- `GET /admin/event/:eventId/enrollments` - Get event enrollments
- `POST /admin/create-admin` - Create new admin (super admin only)
- `POST /admin/remove-admin` - Remove admin (super admin only)

## Technologies Used

- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Authentication:** JWT, bcryptjs
- **Notifications:** Nodemailer (Email), Twilio (SMS)
- **Frontend:** HTML, CSS, Vanilla JavaScript
- **Styling:** Custom CSS with gradients and modern design

## Features in Detail

### Authentication
- No OTP verification required for signup
- Secure password hashing with bcrypt
- JWT token-based authentication
- Role-based access control

### Event Management
- Create events with categories (Technical, Cultural, Sports, Workshop, Seminar)
- Set maximum attendees limit
- Track enrollments in real-time
- Colorful event cards based on category

### Admin Dashboard
- View total events, enrollments, and students
- Create and manage events
- View detailed student information with energy and points
- Track enrollments for each event

### Notifications
- Automatic email notifications on event registration
- Optional SMS notifications (requires Twilio setup)
- User preference-based notification delivery

## Troubleshooting

### MongoDB Connection Issues
- Make sure MongoDB is running locally or use MongoDB Atlas
- Verify the connection string in `.env` file

### Email Not Sending
- Use Gmail App Password, not regular password
- Enable "Less secure app access" if needed
- Check if email credentials are correct

### SMS Not Working
- SMS requires valid Twilio credentials
- Ensure phone numbers are in E.164 format (+919876543210)

## License

ISC

## Support

For issues or questions, please contact the development team.
