const validator = require("validator");

const validarEvento = (parametros) => {
   let validateIdUsuario = !validator.isEmpty(parametros.usuarioId) && 
      validator.isLength(parametros.usuarioId, { min: 4, max: undefined });
      // if (!validateIdUsuario) {
      //    console.log("Nombre no válida");
      // }
   let validateIdEvento = !validator.isEmpty(parametros.eventoId) && 
      validator.isLength(parametros.descripcion, { min: 10, max: undefined });
      // if ( !validateIdEvento ) {
      //    console.log("Descripcion no válida");
      // }


   if (!validateIdUsuario || !validateIdEvento) {
      throw new Error("Información no válida");
   }
}

module.exports = {
   validarEvento
}