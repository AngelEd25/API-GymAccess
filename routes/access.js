const express = require('express');
const router = express.Router();
const { registerAccess, getAccess, getAccessByUser, deleteAccess} = require('../controllers/access');

router.post('/access', registerAccess);
router.get('/access', getAccess);
router.get('/access/:idUser', getAccessByUser);
router.delete('/access/:id', deleteAccess); 

module.exports = router;