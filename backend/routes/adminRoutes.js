const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/auth'); // JWT auth middleware

router.post('/create-admin', authMiddleware, adminController.createAdmin);
router.post('/remove-admin', authMiddleware, adminController.removeAdmin);
router.get('/dashboard', authMiddleware, adminController.getDashboardStats);
router.get('/students', authMiddleware, adminController.getAllStudents);
router.get('/event/:eventId/enrollments', authMiddleware, adminController.getEventEnrollments);

module.exports = router;