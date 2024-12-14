const express = require('express');
const { createOrder, webhookHandler } = require('../controllers/orderController');

const router = express.Router();
router.post('/create', createOrder);
router.post('/webhook', express.raw({ type: 'application/json' }), webhookHandler);

module.exports = router;
