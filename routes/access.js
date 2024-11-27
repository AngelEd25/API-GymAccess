const express = require('express');
const router = express.Router();
const { registerAccess } = require('../controllers/access');

router.post('/access', registerAccess);

module.exports = router;
