const Access = require('../models/access');
const Card = require('../models/card');

// Buscar acceso por UID de la tarjeta
const getAccessByUID = async (req, res) => {
  const { cardUid } = req.params;

  try {
      // Buscar la tarjeta que coincida con el UID proporcionado
      str = String(cardUid)
      const card = await Card.findOne({ lote: str });

      if (!card) {
          return res.status(404).json({ message: "No se encontró una tarjeta con el UID especificado: ${str}" });
      }

      // Buscar el acceso relacionado con la tarjeta encontrada
      const access = await Access.findOne({ card: card._id })
          .populate('user') // Si necesitas incluir información del usuario
          .populate('card'); // Si necesitas incluir información de la tarjeta

      if (!access) {
          return res.status(404).json({ message: "No se encontró acceso para esta tarjeta" });
      }

      // Respuesta con información del acceso
      res.status(200).json({
          message: "Acceso encontrado",
          access
      });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

// Registrar un acceso (Create)
const registerAccess = async (req, res) => {
    const { userId, lote } = req.body;
  
    try {
      // Buscar la tarjeta que coincida con el lote
      const card = await Card.findOne({ lote });
  
      if (!card) {
        return res.status(404).json({ message: "No se encontró una tarjeta con el lote especificado" });
      }
  
      // Registrar el acceso con la tarjeta encontrada
      const access = new Access({
        user: userId,
        card: card._id, // Usar el ID de la tarjeta encontrada
        cardUID: lote,
        accessDate: new Date(),
        accessGranted: true,
      });
  
      await access.save();
  
      res.status(201).json({ message: "Acceso registrado exitosamente", access });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

// Leer todos los accesos (Read)
const getAccess = async (req, res) => {
   try {
       const accesses = await Access.find()
       .populate('card')
       .populate('user');
       res.status(200).json(accesses);
   } catch (error) {
       res.status(500).json({ error: error.message });
   }
};

// Leer un acceso por ID (Read)
const getAccessByUser = async (req, res) => {
   const { idUser } = req.params;
   try {
        const access = await Access.find({ user: idUser }).populate('user');
       if (!access) return res.status(404).json({ message: 'Acceso no encontrado' });
       res.status(200).json(access);
   } catch (error) {
       res.status(500).json({ error: error.message });
   }
};

// Actualizar un acceso (Update)
const updateAccess = async (req, res) => {
   const { id } = req.params;
   const updates = req.body; // Ej. {accessGranted: false}
   try {
       const access = await Access.findByIdAndUpdate(id, updates, { new: true });
       if (!access) return res.status(404).json({ message: 'Acceso no encontrado' });
       res.status(200).json({ message: 'Acceso actualizado exitosamente', access });
   } catch (error) {
       res.status(500).json({ error: error.message });
   }
};

// Eliminar un acceso (Delete)
const deleteAccess = async (req, res) => {
   const { id } = req.params;
   try {
       const access = await Access.findByIdAndDelete(id);
       if (!access) return res.status(404).json({ message: 'Acceso no encontrado' });
       res.status(200).json({ message: 'Acceso eliminado exitosamente' });
   } catch (error) {
       res.status(500).json({ error: error.message });
   }
};
module.exports = {
   registerAccess,
   getAccess,
   getAccessByUID,
   getAccessByUser,
   updateAccess,
   deleteAccess,
}