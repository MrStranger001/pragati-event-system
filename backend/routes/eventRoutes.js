const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const authMiddleware = require('../middleware/auth');

router.post('/create', authMiddleware, eventController.createEvent);
router.post('/:id/register', authMiddleware, eventController.registerForEvent);

module.exports = router;