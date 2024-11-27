const Subscription = require('../models/Subscription');

// Crear una suscripción (Create)
const createSubscription = async (req, res) => {
   const { type, price, startDate, endDate, userId } = req.body;
   try {
       const subscription = new Subscription({ type, price, startDate, endDate, user: userId });
       await subscription.save();
       res.status(201).json({ message: 'Suscripción creada exitosamente', subscription });
   } catch (error) {
       res.status(400).json({ error: error.message });
   }
};

// Leer todas las suscripciones (Read)
const getSubscriptions = async (req, res) => {
   try {
       const subscriptions = await Subscription.find().populate('user');
       res.status(200).json(subscriptions);
   } catch (error) {
       res.status(500).json({ error: error.message });
   }
};

// Leer una suscripción por ID (Read)
const getSubscriptionById = async (req, res) => {
   const { id } = req.params;
   try {
       const subscription = await Subscription.findById(id).populate('user');
       if (!subscription) return res.status(404).json({ message: 'Suscripción no encontrada' });
       res.status(200).json(subscription);
   } catch (error) {
       res.status(500).json({ error: error.message });
   }
};

// Actualizar una suscripción (Update)
const updateSubscription = async (req, res) => {
   const { id } = req.params;
   const updates = req.body; // Ej. {type: 'Trimestral', price: 199}
   try {
       const subscription = await Subscription.findByIdAndUpdate(id, updates, { new: true });
       if (!subscription) return res.status(404).json({ message: 'Suscripción no encontrada' });
       res.status(200).json({ message: 'Suscripción actualizada exitosamente', subscription });
   } catch (error) {
       res.status(500).json({ error: error.message });
   }
};

// Eliminar una suscripción (Delete)
const deleteSubscription = async (req, res) => {
   const { id } = req.params;
   try {
       const subscription = await Subscription.findByIdAndDelete(id);
       if (!subscription) return res.status(404).json({ message: 'Suscripción no encontrada' });
       res.status(200).json({ message: 'Suscripción eliminada exitosamente' });
   } catch (error) {
       res.status(500).json({ error: error.message });
   }
};

// Cambiar el status de la suscripción
const changeSubscriptionStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;  // Ej. { status: 'inactive' }
    
    try {
        const subscription = await Subscription.findByIdAndUpdate(id, { status }, { new: true });
        if (!subscription) return res.status(404).json({ message: 'Suscripción no encontrada' });
        res.status(200).json({ message: `El status de la suscripción ha sido actualizado a ${status}`, subscription });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createSubscription,
    getSubscriptions,
    getSubscriptionById,
    updateSubscription,
    deleteSubscription,
    changeSubscriptionStatus,
}