const express = require('express');
const router = express.Router();
const { registerAccess, getAccess, getAccessByUser} = require('../controllers/access');

router.post('/access', registerAccess);
router.get('/access', getAccess);
router.get('/access/:idUser', getAccessByUser);



module.exports = router;
