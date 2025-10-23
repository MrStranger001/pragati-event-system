# Quick Start Guide - Pragati Event System

## 🚀 Quick Setup (5 minutes)

### Step 1: Install MongoDB

**Option A: Local Installation**
- Download from: https://www.mongodb.com/try/download/community
- Install and start MongoDB service

**Option B: Use MongoDB Atlas (Cloud - Recommended for quick testing)**
1. Go to https://www.mongodb.com/cloud/atlas/register
2. Create a free account
3. Create a new cluster (Free tier)
4. Get your connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/`)

### Step 2: Configure Environment

1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Edit `.env` file and update `MONGO_URI`:
   ```env
   # For MongoDB Atlas:
   MONGO_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/pragati-events?retryWrites=true&w=majority

   # OR for local MongoDB:
   MONGO_URI=mongodb://localhost:27017/pragati-events
   
   # Email (optional but recommended for testing):
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-gmail-app-password
   
   # JWT Secret (keep as is):
   JWT_SECRET=pragati_event_system_secret_key_2024
   ```

### Step 3: Install and Seed

```bash
# Install dependencies (if not already done)
npm install

# Seed database with test accounts
npm run seed
```

You should see:
```
✅ Created super_admin: superadmin@pragati.edu
✅ Created stall_admin: stalladmin@pragati.edu
✅ Created ncc_admin: nccadmin@pragati.edu
✅ Created student: rahul.kumar@pragati.edu
✅ Created student: priya.sharma@pragati.edu
✅ Created student: amit.patel@pragati.edu
```

### Step 4: Start the Server

```bash
npm start
```

Server will start on `http://localhost:3000`

### Step 5: Test the Application

Open your browser and go to: `http://localhost:3000`

## 🧪 Testing Scenarios

### Test 1: Student Login and Event Registration

1. **Login as Student**
   - Go to `http://localhost:3000`
   - Email: `rahul.kumar@pragati.edu`
   - Password: `student123`
   - Click Login
   - ✅ Should redirect to events page

2. **View Events (will be empty initially)**
   - You should see a colorful events page
   - If no events, you'll see "No events available"

3. **Add Phone Number (optional)**
   - If prompted, add phone: `+91 9876543210`
   - Click Save

### Test 2: Admin Login and Event Creation

1. **Login as Admin**
   - Go to `http://localhost:3000`
   - Email: `superadmin@pragati.edu`
   - Password: `admin123`
   - Click Login
   - ✅ Should redirect to admin dashboard

2. **View Dashboard**
   - You should see stats:
     - Total Events: 0
     - Total Enrollments: 0
     - Total Students: 3

3. **Create a New Event**
   - Click "➕ Create New Event"
   - Fill in:
     - **Name:** Tech Talk on AI
     - **Description:** An exciting session on Artificial Intelligence
     - **Date:** (Select future date and time)
     - **Location:** Auditorium A
     - **Category:** Technical
     - **Max Attendees:** 50
   - Click "Create Event"
   - ✅ Should show success message

4. **View Created Event**
   - Event should appear in "My Events" section
   - Click "View Details" to see enrollment info

### Test 3: Student Event Registration

1. **Logout from Admin**
   - Click Logout button

2. **Login as Student**
   - Email: `priya.sharma@pragati.edu`
   - Password: `student123`

3. **Register for Event**
   - You should now see the event created by admin
   - Event card will be colored based on category (blue for technical)
   - Click "Register" button
   - ✅ Should show success message: "Successfully registered for the event! 🎉"

4. **Check Admin Dashboard**
   - Logout and login as admin again
   - Dashboard should now show:
     - Total Events: 1
     - Total Enrollments: 1
   - View event details to see enrolled student

### Test 4: Try All Features

#### Test Different Admin Roles
- Login as `stalladmin@pragati.edu` (password: `admin123`)
- Login as `nccadmin@pragati.edu` (password: `admin123`)
- Each can create events and view their own events

#### Test Different Student Accounts
- `rahul.kumar@pragati.edu` (student123)
- `priya.sharma@pragati.edu` (student123)
- `amit.patel@pragati.edu` (student123)

#### Test Event Categories
Create events with different categories:
- Technical (Blue)
- Cultural (Orange)
- Sports (Green)
- Workshop (Purple)
- Seminar (Red)
- Other (Gray)

#### Test Sign Up
- Click "Sign up here" on login page
- Create new account with `@pragati.edu` email
- No OTP required!
- After signup, login with new credentials

## 🎨 Features to Verify

### Student Features
- ✅ Login without OTP
- ✅ View colorful event cards
- ✅ Register for events
- ✅ Add phone number for SMS notifications
- ✅ See event details (date, location, category)
- ✅ View enrollment count

### Admin Features
- ✅ Login to admin dashboard
- ✅ View statistics (events, enrollments, students)
- ✅ Create new events with categories
- ✅ View all events created by admin
- ✅ See enrolled students for each event
- ✅ View all students with energy and points
- ✅ Track student information

### UI Features
- ✅ Colorful gradient design
- ✅ Category-based event card colors
- ✅ Responsive layout
- ✅ Modern forms and buttons
- ✅ Success/error messages
- ✅ Modal dialogs for event creation

## 🐛 Troubleshooting

### "Cannot connect to MongoDB"
- Check if MongoDB is running (local) or connection string is correct (Atlas)
- Run: `npm run seed` again after fixing connection

### "Login failed"
- Make sure you ran `npm run seed`
- Check credentials match those in seed script

### "Events not showing"
- Login as admin first and create events
- Events are only visible after creation

### Port already in use
- Kill the process using port 3000:
  ```bash
  # On Linux/Mac:
  lsof -ti:3000 | xargs kill
  
  # On Windows:
  netstat -ano | findstr :3000
  taskkill /PID <PID> /F
  ```

## 📧 Email Notifications (Optional)

To enable email notifications:

1. Get Gmail App Password:
   - Go to Google Account → Security
   - Enable 2-Step Verification
   - Generate App Password
   - Use this password in `.env` as `EMAIL_PASSWORD`

2. Update `.env`:
   ```env
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-16-char-app-password
   ```

3. Restart server

Now when students register for events, they'll receive email notifications!

## 📱 SMS Notifications (Optional)

To enable SMS notifications:

1. Sign up for Twilio: https://www.twilio.com/try-twilio
2. Get your credentials
3. Update `.env`:
   ```env
   TWILIO_SID=your-twilio-sid
   TWILIO_AUTH_TOKEN=your-twilio-auth-token
   TWILIO_PHONE=your-twilio-phone-number
   ```

## 🎉 Success!

If you can:
- ✅ Login as student and admin
- ✅ Create events as admin
- ✅ Register for events as student
- ✅ See colorful UI with proper styling
- ✅ View dashboard stats

Then everything is working perfectly! 🚀

## Need Help?

Check `SETUP.md` for detailed documentation.
