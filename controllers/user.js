const User = require('../models/user');
const {validarUsuario} = require("../validators/usuario");

// Crear un usuario (Create)
const createUser = async (req, res) => {
    const { name, lastName, email, gender, password, role} = req.body;
    
    // validarUsuario(req.body);
    
    try {
        const user = new User({ name, lastName, email, gender, password, role});

        await user.save();
        res.status(201).json({ message: 'Usuario creado exitosamente', user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Leer todos los usuarios (Read)
const getUsers = async (req, res) => {
    try {
        const users = await User.find().populate('cards');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Leer un usuario por ID (Read)
const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id).populate('card')
        .populate('subscription')
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar un usuario (Update)
const updateUser = async (req, res) => {
    const { id } = req.params;
    const updates = req.body; // Ej. {name: 'Nuevo Nombre', email: 'nuevoemail@example.com'}
    try {
        const user = await User.findByIdAndUpdate(id, updates, { new: true });
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
        res.status(200).json({ message: 'Usuario actualizado exitosamente', user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar un usuario (Delete)
const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
        res.status(200).json({ message: 'Usuario eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Cambiar el status del usuario
const changeUserStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;  // Ej. { status: 'inactive' }
    
    try {
        const user = await User.findByIdAndUpdate(id, { status }, { new: true });
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
        res.status(200).json({ message: `El status del usuario ha sido actualizado a ${status}`, user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
    changeUserStatus,
}