const Subscription = require('../models/subscription');
const User = require('../models/user');

// Crear una suscripción (Create)
const createSubscription = async (req, res) => {
   const { type, price, startDate, endDate, userId, card} = req.body;
 
        // Buscar usuario para incluir la referencia a la subscripcion
        const locateUser = await User.findById(
            userId // ID del usuario a actualizar
        );
        if (!locateUser) {
        
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        else{
            // Crear la subscripcion asociada al usuario
            const sub = new Subscription({ type, price, startDate, card, endDate, user: userId });
            await sub.save();
            // Actualizar el modelo de usuario para incluir la referencia a la tarjeta
            const user = await User.findByIdAndUpdate(
                userId, // ID del usuario a actualizar
                { subscription: sub._id }, // Asignar la tarjeta creada
                { new: true } // Retornar el usuario actualizado
            );
            res.status(201).json({ message: 'Suscripción creada exitosamente', sub });
        }

       

};

// Leer todas las suscripciones (Read)
const getSubscriptions = async (req, res) => {
   try {
       const subscriptions = await Subscription.find()
       .populate('card')
       .populate('user');
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
   const { type, price, startDate, endDate, userId } = req.body;
   try {
       const subscription = await Subscription.findByIdAndUpdate(id, { type, price, startDate, endDate, user: userId }, { new: true });
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