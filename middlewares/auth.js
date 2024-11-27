// Importar modulos
const jwt = require("jwt-simple");
const moment = require("moment");
// importar clave secreta
const libjwt = require("../services/jwt")
const secret = libjwt.secret;
// funcion de autenticacion

const auth = (req, res, next) => {

// comprobar su llega la cabecera de autenticacion
   if(!req.headers.authorization){
      return res.status(403).send({
         status: "error",
         message: "La peticion no tiene cabecera de autenticación"
      })
   }
   // decodificar el token
   try {
      let token = req.headers.authorization.replace(/['"]+/g, '');
      let payload = jwt.decode(token, secret);
      
      console.log(payload.exp <= moment().unix());
      if(payload.exp <= moment().unix()){
         return res.status(401).send({
            status: "error",
            message: "Token expirado",
         });
      }

   // agregar datos de usuario request
      req.user = payload;

   } catch(error){
      return res.status(404).send({
         status: "error",
         message: "Token invalido"
      })
   }

   // pasar a ejecucion de accion
   
   next()
}

module.exports = {
   auth
}