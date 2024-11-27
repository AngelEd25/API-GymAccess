const express = require("express");
const router = express.Router();
const multer = require ("multer");

const UsuarioController = require("../controllers/usuario")
const UserController = require("../controllers/user")

const check = require("../middlewares/auth")

const storage = multer.diskStorage({
   destination: (req, file, cb) =>{
      cb(null, './FRONT/images/usuario/');
   },
   
   filename: (req, file, cb) =>{
      cb(null, "usuario" + Date.now() + file.originalname); 
   }

})


const uploads = multer({storage});
// -----------METODOS CRUD----------------
// METODO POST ( REGISTRAR USUARIO)
router.post("/usuario/registrar", UsuarioController.registrar);
// METODO POST ( LOGIN USUARIO)
router.post("/usuario/login", UsuarioController.login);
// METODO POST (AGREGAR USUARIO)
router.post("/usuario/agregar", check.auth, UsuarioController.agregar);
// METODO GETid (TRAER UN SOLO USUARIO)
router.get("/usuario/perfil/:id", UsuarioController.perfil);
// METODO GET (TRAER TODOS EL usuario CON FILTROS)
router.get("/usuarios/traer",  UsuarioController.traer);
// METODO PUT (EDITAR)
router.put("/usuario/actualizar/:id", check.auth, UsuarioController.actualizar);
// METODO DELETE (ELIMINAR USUARIO)
router.delete("/usuario/borrar/:id", check.auth, UsuarioController.borrar);
// METODO PUT (EDITAR Y SUSPENDER usuario POR STATUS)
router.put("/usuario/suspender/:id", check.auth, UsuarioController.suspender);
// METODO PUT (EDITAR Y ACTIVAR usuario POR STATUS)
router.put("/usuario/activar/:id", check.auth, UsuarioController.activar);

// METODO POST PARA SUBIR IMAGENES)
router.post("/usuario/subir-imagen/:id", check.auth, [uploads.single("imagen")], UsuarioController.subir);

// export default router;
module.exports = router;