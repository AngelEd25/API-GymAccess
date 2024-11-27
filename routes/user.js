const express = require('express');
const router = express.Router();

const { createUser, getUsers, getUserById, updateUser, deleteUser, changeUserStatus} = require('../controllers/user');
const { register, login} = require('../controllers/auth');


router.post('/user', createUser);            // Crear usuario
router.get('/users', getUsers);               // Leer todos los usuarios
router.get('/users/:id', getUserById);        // Leer un usuario por ID
router.put('/user/:id', updateUser);         // Actualizar un usuario
router.delete('/user/:id', deleteUser);  // Eliminar un usuario (si lo deseas, o cambiar a desactivar)
router.patch('/user/:id/status', changeUserStatus);  // Cambiar el status del usuario
// Ruta para registrar un usuario
router.post('/user/register', register);
// Ruta para login de usuario
router.post('/user/login', login);

module.exports = router;
