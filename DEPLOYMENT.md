# Deployment Checklist - Pragati Event System

## Pre-Deployment Checklist

### 1. Prerequisites ✅
- [x] Node.js installed (v14+)
- [x] MongoDB running (local or Atlas)
- [x] Git repository cloned
- [x] Terminal/Command Prompt ready

### 2. Installation Steps ✅
```bash
# Navigate to backend
cd pragati-event-system/backend

# Install dependencies
npm install

# Should see: "added X packages"
```

### 3. MongoDB Configuration ✅
```bash
# Edit backend/.env file
MONGO_URI=mongodb://localhost:27017/pragati-events
# OR for MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/pragati-events
```

**Test MongoDB Connection:**
```bash
# Try connecting with mongo shell or MongoDB Compass
# Verify database is accessible
```

### 4. Seed Database ✅
```bash
npm run seed
```

**Expected Output:**
```
Connected to MongoDB
✅ Created super_admin: superadmin@pragati.edu
✅ Created stall_admin: stalladmin@pragati.edu
✅ Created ncc_admin: nccadmin@pragati.edu
✅ Created student: rahul.kumar@pragati.edu
✅ Created student: priya.sharma@pragati.edu
✅ Created student: amit.patel@pragati.edu
✅ Created sample event: Tech Talk: AI & Machine Learning
✅ Created sample event: Cultural Fest 2024
✅ Created sample event: Inter-College Cricket Tournament
✅ Created sample event: Web Development Workshop
✅ Created sample event: Career Guidance Seminar

🎉 Database seeded successfully!
```

### 5. Start Server ✅
```bash
npm start
```

**Expected Output:**
```
Server running on http://localhost:3000
MongoDB connected
```

### 6. Verify Installation ✅
Open browser: `http://localhost:3000`

**You should see:**
- Login page with Pragati Event System branding
- Purple gradient background
- Clean, modern UI

## Testing Checklist

### Test 1: Student Login & Events ✅
1. **Login as Student**
   - Email: `rahul.kumar@pragati.edu`
   - Password: `student123`
   - Click "Login"
   
2. **Expected Result:**
   - Redirects to `/events`
   - Shows colorful event cards
   - See 5 sample events
   - Each event has different color based on category

3. **Test Event Registration**
   - Click "Register" on any event
   - Should see success message
   - Event counter should update

### Test 2: Admin Dashboard ✅
1. **Logout** (if logged in as student)
   
2. **Login as Admin**
   - Email: `superadmin@pragati.edu`
   - Password: `admin123`
   - Click "Login"
   
3. **Expected Result:**
   - Redirects to `/admin-dashboard`
   - Shows statistics:
     - Total Events: 5
     - Total Enrollments: (number of registrations)
     - Total Students: 3
   - Shows "Create New Event" button
   - Lists all 5 sample events

4. **Test Event Creation**
   - Click "➕ Create New Event"
   - Fill in form:
     - Name: "Test Event"
     - Description: "This is a test"
     - Date: (select future date)
     - Location: "Test Hall"
     - Category: Technical
     - Max Attendees: 50
   - Click "Create Event"
   - Should see success message
   - Event appears in dashboard

### Test 3: Multiple Users ✅
1. **Open another browser/incognito window**
2. **Login as different student**
   - Email: `priya.sharma@pragati.edu`
   - Password: `student123`
3. **Register for event**
4. **Check admin dashboard** (in first window)
   - Enrollment count should increase

### Test 4: Phone Number Addition ✅
1. **Login as student without phone**
   - Create new account via signup
2. **Should see phone prompt**
3. **Add phone**: `+91 9876543210`
4. **Click Save**
5. **Prompt should disappear**

### Test 5: Signup Flow ✅
1. **Go to login page**
2. **Click "Sign up here"**
3. **Fill form:**
   - Name: "Test User"
   - Email: "test.user@pragati.edu"
   - Password: "test123"
   - Phone: "+91 9999999999" (optional)
   - Notification: Email
4. **Click "Sign Up"**
5. **Expected:**
   - Success message
   - Auto-redirect to login after 2 seconds
6. **Login with new credentials**
7. **Should redirect to events page**

## Optional: Email Notifications Setup

### Gmail Configuration
1. **Go to Google Account Settings**
2. **Security → 2-Step Verification** (Enable)
3. **Security → App Passwords**
4. **Generate app password**
5. **Update .env:**
   ```env
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-16-char-app-password
   ```
6. **Restart server**
7. **Test:** Register for event, check email

## Optional: SMS Notifications Setup

### Twilio Configuration
1. **Sign up at https://www.twilio.com**
2. **Get credentials from dashboard**
3. **Update .env:**
   ```env
   TWILIO_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   TWILIO_AUTH_TOKEN=your-auth-token
   TWILIO_PHONE=+15555555555
   ```
4. **Restart server**
5. **Test:** Set notification preference to SMS, register for event

## Visual Verification Checklist

### Login Page Should Have:
- [x] Purple gradient background
- [x] White card in center
- [x] Pragati Event System logo/title
- [x] Email and password fields
- [x] Blue gradient login button
- [x] "Sign up here" link

### Events Page Should Have:
- [x] Top navbar with "Pragati Events"
- [x] User greeting on right
- [x] Logout button
- [x] Phone prompt (if no phone)
- [x] Grid of colorful event cards
- [x] Each card shows:
  - Category color header
  - Event name
  - Category badge
  - Description
  - Date with calendar icon
  - Location with pin icon
  - Attendee count
  - Register button

### Admin Dashboard Should Have:
- [x] Top navbar with "Admin Dashboard"
- [x] User role displayed
- [x] Logout button
- [x] Three stat cards with gradients
- [x] "Create New Event" button
- [x] Events table showing:
  - Event name
  - Date
  - Category badge
  - Enrollments
  - View Details button
- [x] Students table showing:
  - Name, Email, Phone
  - Energy (green)
  - Points (orange)
  - Join date

## Color Verification

Event cards should display these colors:

- **Technical**: Blue gradient (#2196F3)
- **Cultural**: Orange gradient (#FF9800)
- **Sports**: Green gradient (#4CAF50)
- **Workshop**: Purple gradient (#9C27B0)
- **Seminar**: Red gradient (#F44336)
- **Other**: Gray gradient (#607D8B)

## Performance Checklist

- [x] Pages load in < 2 seconds
- [x] No console errors in browser
- [x] Images/icons display correctly
- [x] Forms submit successfully
- [x] API responses < 1 second
- [x] No memory leaks

## Security Verification

- [x] Passwords are hidden when typing
- [x] JWT tokens stored in localStorage
- [x] Protected routes redirect to login
- [x] Admin routes blocked for students
- [x] Rate limiting works (test by spamming requests)
- [x] Invalid emails rejected
- [x] SQL injection attempts blocked

## Troubleshooting

### Issue: "Cannot connect to MongoDB"
**Solution:**
```bash
# Check if MongoDB is running
mongod --version

# Or check MongoDB Atlas connection string
# Ensure IP is whitelisted in Atlas
```

### Issue: "Port 3000 already in use"
**Solution:**
```bash
# On Linux/Mac
lsof -ti:3000 | xargs kill

# On Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or change port in backend/app.js
```

### Issue: "Module not found"
**Solution:**
```bash
cd backend
npm install
```

### Issue: "Seed script fails"
**Solution:**
```bash
# Check MongoDB connection
# Update MONGO_URI in .env
# Try again: npm run seed
```

### Issue: "Login fails with correct password"
**Solution:**
```bash
# Re-run seed script
npm run seed
# This will create accounts if they don't exist
```

## Production Deployment Checklist

### Environment
- [ ] Set NODE_ENV=production
- [ ] Use production MongoDB (not local)
- [ ] Set strong JWT_SECRET
- [ ] Configure HTTPS/SSL
- [ ] Set up domain name

### Security
- [ ] Add Helmet.js for headers
- [ ] Enable HTTPS only
- [ ] Restrict CORS to specific domains
- [ ] Set secure cookie flags
- [ ] Enable MongoDB authentication

### Monitoring
- [ ] Set up error logging (Winston)
- [ ] Configure uptime monitoring
- [ ] Set up performance monitoring
- [ ] Enable access logs
- [ ] Set up alerts

### Backup
- [ ] Configure MongoDB backups
- [ ] Document restore procedure
- [ ] Test backup restoration
- [ ] Set up automated backups

## Success Metrics

After deployment, verify:
- [ ] All 3 admin accounts can login
- [ ] All 3 student accounts can login
- [ ] New users can signup
- [ ] Events display with correct colors
- [ ] Event registration works
- [ ] Admin can create events
- [ ] Dashboard shows correct stats
- [ ] Notifications work (if configured)

## Final Verification

Run through this complete flow:
1. Sign up new user → Success
2. Login with new user → Redirect to events
3. Register for 2 events → Success messages
4. Logout
5. Login as admin → Redirect to dashboard
6. Check enrollments → Shows 2 registrations
7. Create new event → Appears in list
8. Logout
9. Login as new user again → See new event
10. Register → Success

If all steps pass: ✅ **DEPLOYMENT SUCCESSFUL!**

## Support

For issues:
1. Check QUICKSTART.md
2. Check SETUP.md
3. Review error logs
4. Check GitHub issues
5. Contact development team

## Maintenance

Weekly:
- [ ] Check logs for errors
- [ ] Review user registrations
- [ ] Monitor database size
- [ ] Check backup status

Monthly:
- [ ] Update dependencies: `npm audit fix`
- [ ] Review security advisories
- [ ] Update Node.js if needed
- [ ] Performance review

---

**Deployment Date:** _____________
**Deployed By:** _____________
**MongoDB:** _____________
**Status:** ✅ / ❌
**Notes:** _____________
