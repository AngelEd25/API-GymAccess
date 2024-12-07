const User = require('../models/user');
const Card = require('../models/card');
const {validarUsuario} = require("../validators/usuario");

const register = async (req, res) => {
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

// Login de usuario
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ message: 'Credenciales incorrectas' });
        }
        const token = jwt.createToken({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

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
        const users = await User.find()
        .populate('subscription')
        .populate('card');
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
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar un usuario (Update)
const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, lastName, email, gender, password, role} = req.body;// Ej. {name: 'Nuevo Nombre', email: 'nuevoemail@example.com'}

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
    register,
    login,
}