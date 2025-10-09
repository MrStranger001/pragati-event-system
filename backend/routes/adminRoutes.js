const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/auth'); // JWT auth middleware

router.post('/create-admin', authMiddleware, adminController.createAdmin);
router.post('/remove-admin', authMiddleware, adminController.removeAdmin);

module.exports = router;