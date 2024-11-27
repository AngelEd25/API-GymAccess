const express = require('express');
const router = express.Router();

const { createSubscription, getSubscriptions, getSubscriptionById, updateSubscription, deleteSubscription, changeSubscriptionStatus} = require('../controllers/subscription');

// Rutas para las suscripciones

router.post('/subscriptions', createSubscription);  // Crear suscripción
router.get('/subscriptions', getSubscriptions);  // Leer todas las suscripciones
router.get('/subscriptions/:id', getSubscriptionById);  // Leer una suscripción por ID
router.put('/subscriptions/:id', updateSubscription);  // Actualizar una suscripción
router.delete('/subscriptions/:id', deleteSubscription);  // Eliminar una suscripción (opcional)
router.patch('/subscriptions/:id/status', changeSubscriptionStatus);  // Cambiar el status de la suscripción

module.exports = router;
