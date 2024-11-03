// routes/translationRoutes.js
const express = require('express');
const { addmessage } = require('../Controllers/Translator');

const router = express.Router();

// Define the translation route
router.post('/translate', addmessage );

module.exports = router;


