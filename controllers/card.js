const Card = require('../models/card');
const User = require('../models/user');


// Crear una card (Create)
const createCard = async (req, res) => {
    const { lote, userId } = req.body;
    try {
        // Actualizar el modelo de usuario para incluir la referencia a la tarjeta
        const locateUser = await User.findById(
            userId, // ID del usuario a actualizar
        );
        if (!locateUser) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        else{
            // Crear la tarjeta asociada al usuario
            const card = new Card({ lote, user: userId });
            await card.save();
            // Actualizar el modelo de usuario para incluir la referencia a la tarjeta
            const user = await User.findByIdAndUpdate(
                userId, // ID del usuario a actualizar
                { card: card._id }, // Asignar la tarjeta creada
                { new: true } // Retornar el usuario actualizado
            );
            res.status(201).json({ message: 'Tarjeta creada exitosamente', card, user });
        }
       
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
 };
 

// Leer todas las cards (Read)
const getCards = async (req, res) => {
   try {
       const cards = await Card.find().populate('user');
       res.status(200).json(cards);
   } catch (error) {
       res.status(500).json({ error: error.message });
   }
};

// Leer una card por ID (Read)
const getCardById = async (req, res) => {
   const { id } = req.params;
   try {
       const card = await Card.findById(id).populate('user');
       if (!card) return res.status(404).json({ message: 'Tarjeta no encontrada' });
       res.status(200).json(card);
   } catch (error) {
       res.status(500).json({ error: error.message });
   }
};

// Leer una card por UID (Read)
const getCardByUId = async (req, res) => {
    const { id } = req.params;
    try {
        const card = await Card.find({ lote: id }).populate('user');
        if (!card) return res.status(404).json({ message: 'Tarjeta no encontrada' });
        res.status(200).json(card);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
 };

// Actualizar una card (Update)
const updateCard = async (req, res) => {
   const { id } = req.params;
   const updates = req.body; // Ej. {type: 'Trimestral', price: 199}
   try {
       const card = await Card.findByIdAndUpdate(id, updates, { new: true });
       if (!card) return res.status(404).json({ message: 'Tarjeta no encontrada' });
       res.status(200).json({ message: 'Tarjeta actualizada exitosamente', card });
   } catch (error) {
       res.status(500).json({ error: error.message });
   }
};

// Eliminar una card (Delete)
const deleteCard = async (req, res) => {
   const { id } = req.params;
   try {
       const card = await Card.findByIdAndDelete(id);
       if (!card) return res.status(404).json({ message: 'Tarjeta no encontrada' });
       res.status(200).json({ message: 'Tarjeta eliminada exitosamente' });
   } catch (error) {
       res.status(500).json({ error: error.message });
   }
};

// Cambiar el status de la card
const changeCardStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;  // Ej. { status: 'inactive' }
    try {
        const card = await Card.findByIdAndUpdate(id, { status }, { new: true });
        if (!card) return res.status(404).json({ message: 'Tarjeta no encontrada' });
        res.status(200).json({ message: `El status de la tarjeta ha sido actualizado a ${status}`, card });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createCard,
    getCards,
    getCardById,
    getCardByUId,
    updateCard,
    deleteCard,
    changeCardStatus,
}