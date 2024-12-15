const express = require('express');
const router = express.Router();
const { registerAccess, getAccess, getAccessByUID, getAccessByUser, deleteAccess} = require('../controllers/access');

router.post('/access', registerAccess);
router.get('/access', getAccess);
router.get('/access/uid/:cardUid', getAccessByUID)
router.get('/access/:idUser', getAccessByUser);
router.delete('/access/:id', deleteAccess); 

module.exports = router;