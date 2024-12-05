const express = require('express');
const router = express.Router();

const { createCard, getCards, getCardById, updateCard, deleteCard, changeCardStatus} = require('../controllers/card');

// Rutas para las suscripciones

router.post('/card', createCard);  // Crear suscripción
router.get('/cards', getCards);  // Leer todas las suscripciones
router.get('/card/:id', getCardById);  // Leer una suscripción por ID
router.put('/card/:id', updateCard);  // Actualizar una suscripción
router.delete('/card/:id', deleteCard);  // Eliminar una suscripción (opcional)
router.patch('/card/:id/status', changeCardStatus);  // Cambiar el status de la suscripción

module.exports = router;