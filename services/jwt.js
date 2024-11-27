// Importar dependencias
const jwt = require("jwt-simple");
const moment = require("moment");

// clave secreta
const secret = "5A1TRA55Z665TY6XaagsmC5YT656S54xFGS51";

// crear una funcion para generar tokens
const createToken = (user) =>{
   const payload={
      id: user._id,
      name: user.name,
      lastName: user.lastName,
      role: user.role,
      email: user.email,
      status: user.status,
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