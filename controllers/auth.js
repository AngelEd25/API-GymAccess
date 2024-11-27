const User = require('../models/user');
const jwt = require('jwt-simple');
const bcrypt = require('bcrypt');


// Registro de usuario
exports.register = async (req, res) => {
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
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ message: 'Credenciales incorrectas' });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
