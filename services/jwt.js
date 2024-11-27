// Importar dependencias
const jwt = require("jwt-simple");
const moment = require("moment");

// clave secreta
const secret = "5A1TRA55Z665TY6XaagsmC5YT656S54xFGS51";

// crear una funcion para generar tokens
const createToken = (user) =>{
   const payload={
      _id: user._id,
      nombres: user.nombres,
      apellidos: user.apellidos,
      role: user.role,
      correo: user.correo,
      imagen: user.imagen,
      status: user.status,
      fechaDeRegistro: user.fechaDeRegistro,
      iat: moment().unix(),
      exp: moment().add(30, "days").unix()
   };

   // devolver jwt token codificado
   return jwt.encode(payload, secret)
   
}

module.exports = {
   secret,
   createToken
}