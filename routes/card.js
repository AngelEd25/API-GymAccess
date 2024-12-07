const express = require('express');
const router = express.Router();

const { createCard, getCards, getCardById, updateCard, deleteCard, changeCardStatus} = require('../controllers/card');

// Rutas para las cards

router.post('/card', createCard);  // Crear card
router.get('/cards', getCards);  // Leer todas las cards
router.get('/card/:id', getCardById);  // Leer una card por ID
router.put('/card/:id', updateCard);  // Actualizar una card
router.delete('/card/:id', deleteCard);  // Eliminar una card (opcional)
router.patch('/card/:id/status', changeCardStatus);  // Cambiar el status de la card

module.exports = router;