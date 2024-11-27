
const Usuario = require("../models/Usuario");

const bcrypt = require("bcrypt");
const {validarUsuario} = require("../validators/usuario");
// Importar servicios
const jwt = require("../services/jwt")
const fs = require ("fs");
//---------------------------------------------------------------------------------

//RUTAS OFICIALES"
// METODO REGISTRAR USUARIO
const  registrar = (req, res) =>{

   let parametros = req.body;
   console.log(parametros);
   try {
      validarUsuario(parametros);
      
   } catch {
      return res.status(400).send({
         status : "error",
         mensaje: "Datos incompletos",
         
      });
   }  
   Usuario.findOne({correo: parametros.correo.toLowerCase()
   }).then(async(user) =>{

      if((user && user.length >= 1)){
         return res.status(200).send({
            status: "success",
            mesage: "El usuario ya existe"
         })
      }

      let pwd = await bcrypt.hash(parametros.password, 10);
      
      parametros.password = pwd;
      
      const usuario = new Usuario(parametros);

      usuario.save().then((userStored)=>{

            if(!userStored)  return res.status(500).send({
               status : "error",
               msg: "Error al registrar usuario"
            });
               return res.status(200).send({
                  status : "success",
                  msg: "Usuario registrado correctamente",
                  usuario         
               });                      
      })
   });

}

const login =(req, res) =>{

   // recoger parametros
   let parametros =  req.body;

   // buscar en la bdd si existe el id
   if(!parametros.correo || !parametros.password){
      return res.status(400).send({
         status : "error",
         msg: "Error en el correo o contraseña"         
      });  

   }

   Usuario.findOne({ correo: parametros.correo })
      .then((userStored) => {
         
         if (!userStored) return res.status(404).send({ status: "error", mensage: "Usuario inexistente" });
         
         // comprobar su contraseña
         const pwd = bcrypt.compareSync(parametros.password, userStored.password);
         if(!pwd){
            return res.status(400).send({
               status: "error",
               msg: "Contraseña incorrecta",
               userStored
            });
         }
         // Devolver token
         const token = jwt.createToken(userStored);

         // Devolver datos del usuario
         return res.status(200).send({
            status: "success",
            msg: "Se ha logeado correctamente",
            usuario: {
               id: userStored._id,
               nombre: userStored.nombres + " " + userStored.apellidos,
               role: userStored.role
               
            },
            token
         });

      })



}


const agregar = (req, res) =>{
   // Recoger los parametros(datos) por metodo post para guardar
   let parametros = req.body;
   // Validar los parametros(datos)
   console.log(parametros);
   try {   
          
      validarUsuario(parametros);

   } catch {
      return res.status(400).send({
         status : "error",
         mensaje: "Datos incompletos"
      });
   }
   // Crear el objeto a guardar
      //ya estan aasignados los parametros(datos) dentro del funcion
    
   const usuario = new Usuario(parametros);

   //Asignar los valores del objeto basado en el modelo(manual o automatico)
   // usuario.titulo = parametros.titulo;
   
   usuario.save().then(()=>{
      
      console.log(usuario);

      return res.status(200).send({
         status : "success",
         msg: "El usuario fue Agregado",
         usuario: usuario
         
      });
   }).catch((Error)=>{
      console.log(Error);
      return res.status(400).send({
         status: "error",
         mensaje: `Error al agregar el usuario: ${usuario.nombres}`,
         datoIncorrecto: Error
         // datosIngresados: usuario
      });
   });

}

// METODO TRAER TODOS LOS usuarioES
const traer = async(req, res) =>{
   try {
      const usuarios = await Usuario.find({}); 
      return res.status(200).send({
         status: "success",
         usuarios
      });
   } catch (error) {
          return res.status(400).send({
            status: "error",
            mensaje: "",
            error
         });      
   }

}

// METODO TRAER UN usuario POR ID
const perfil = async (req, res) =>{
   // Recoger is por url
   let id = req.params.id
   // console.log(req.params.id);
   try {
      let usuario = await Usuario.findById(id);
      if (!usuario) {
         return res.status(404).send({
            status: "error",
            mensaje: "No se ha encontrado el usuario",
            detalle: `El identificador ${id} no coincide con algun usuario registrado`
         });  
      }
         console.log(usuario)
         return res.status(200).send({
            status: "success",
            usuario,
         });

   } catch (error) {
      return res.status(404).send({
         status: "error",
         mensaje: "Ha sucedido algo inesperado en la peticion",
         detalle: error
      });  
   }

}

const borrar = async (req, res) =>{
   // Recoger is por url
   let idUsuario = req.params.id
   // console.log(req.params.id);
   // try {
      let search = await Usuario.findByIdAndDelete({_id: idUsuario}).then((usuario) =>{
         console.log(usuario);
         
         if (usuario == null) {
            return res.status(404).send({
               status: "error",
               mensaje: "No se ha encontrado el usuario",
               detalle: `El identificador ${idUsuario} no coincide con algun usuario registrado`
            });             
         }

         return res.status(200).send({
            status: "success",
            usuarioEliminado: usuario,
            mensaje: `Se ha eliminado el usuario ${usuario.nombres} exitosamente`
         });   

      });
      
}


const suspender = async (req, res) =>{
   // Recoger iD por url
   let idUsuario = req.params.id
   let parametros = req.body;
   // try {
      let search = await Usuario.findOneAndUpdate({_id: idUsuario}, {status: false}, {new: true})
      .then((usuario)=>{

         console.log(usuario);

         if (usuario == null) {
            return res.status(404).send({
               status: "error",
               mensaje: "No se ha encontrado el usuario",
               detalle: `El identificador ${idUsuario} no coincide con algun usuario registrado`
            })           
         }

         return res.status(200).send({
            status: "success",
            usuario: usuario,
            mensaje: `Se ha suspendido el usuario ${usuario.nombres} exitosamente`
         })  

      }); 

}

const activar = async (req, res) =>{
   // Recoger iD por url
   let idUsuario = req.params.id
   // let parametros = req.body;
   // try {
      let search = await Usuario.findOneAndUpdate({_id: idUsuario}, {status: true}, {new: true})
      .then((usuario)=>{

         console.log(usuario);

         if (usuario == null) {
            return res.status(404).send({
               status: "error",
               mensaje: "No se ha encontrado el usuario",
               detalle: `El identificador ${idUsuario} no coincide con algun usuario registrado`
            })           
         }

         return res.status(200).send({
            status: "success",
            usuario: usuario,
            mensaje: `Se ha suspendido el usuario ${usuario.nombres} exitosamente`
         })  

      }); 

}

const actualizar = async (req, res) =>{
   // Recoger iD por url
   let idUsuario = req.params.id
   // console.log(idUsuario);
   let parametros = req.body;
   // console.log(parametros);


   // VALIDAR DATOS PARA ACTUALIZAR
   try {            
      validarUsuario(parametros);
   } catch{
      return res.status(400).send({
         status : "error",
         mensaje: "Datos incompletos"
         
      });
   }

   try {
         let search = await Usuario.findOneAndUpdate({_id: idUsuario}, parametros, {new: true}).then((usuario)=>{
         
            if (usuario == null) {
               return res.status(404).send({
                  status: "error",
                  mensaje: `${idUsuario}`,
                  error
               })                 
            }
            return res.status(200).send({
               status: "success",
               mensaje: "Se ha actualizado el usuario: " +  `'${usuario.nombres}'` + " exitosamente"
                     
            });              
         })

  
   } catch (error) {
      // console.log(error);
         return res.status(404).send({
         status: "error",
         mensaje: `El identificador ${idUsuario} no coincide con algun usuario registrado`,
         error
      })  
   }
}

   const subir = async(req, res)=>{

      let idUsuario = req.params.id;
      let params = req.body;      // CONFIGURAR MULTER
      // RECOGER EL FICHERO DE IMAGEN SUBIDO
      console.log(req.file);      
      // NOMBRE DE ARCHIVO
      let nombreImagen = req.file.originalname;
      // EXTENSION DEL ARCHIVO
      let imagenSplit = nombreImagen.split("\.");
      // console.log(imagenSplit);
      let tipoImagen = imagenSplit[1];
      console.log(req.file.path);

      // COMPROBAR EXTENSION CORRECTA
      if (tipoImagen != "png" && tipoImagen != "jpg" &&
          tipoImagen != "jpeg" && tipoImagen != "gif") {
         const filePath = req.file.path;

         //BORRAR ARCHIVO Y DAR RESPUESTA
         const fileDeleted = fs.unlink(filePath);
         
         console.log(fileDeleted)
         return res.status(404).send({
            status: "error",
            mensaje: "Extensión de archivo no valida",
            error
         });
      }

      // ACTUALIZAR usuario
      let search = await Usuario.findOneAndUpdate({_id: idUsuario}, {imagen: req.file.filename}, {new: true})
      .then((usuario)=>{

         console.log(usuario);

         if (usuario == null) {
            return res.status(404).send({
               status: "error",
               mensaje: "No se ha encontrado el usuario",
               detalle: `El identificador ${idUsuario} no coincide con algun usuario registrado`
            })           
         }

         return res.status(200).send({
            status: "success",
            usuario: usuario,
            mensaje: `Se ha cambiado el avatar del usuario ${usuario.nombres} `
         })  

      }); 


   }

module.exports= {
   registrar,
   login,
   traer,
   perfil,
   agregar,
   borrar,
   suspender,
   activar,
   actualizar,
   subir
}