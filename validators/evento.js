const validator = require("validator");

const validarEvento = (parametros) => {
   let validateNombre = !validator.isEmpty(parametros.nombre) && 
      validator.isLength(parametros.nombre, { min: 4, max: undefined });
      if (!validateNombre) {
         console.log("Nombre no válida");
      }
   let validateDescripcion = !validator.isEmpty(parametros.descripcion) && 
      validator.isLength(parametros.descripcion, { min: 10, max: undefined });
      if ( !validateDescripcion ) {
         console.log("Descripcion no válida");
      }

   let validateUbicacion = !validator.isEmpty(parametros.lugar) && 
      validator.isLength(parametros.lugar, { min: 5, max: undefined });
      if (!validateUbicacion) {
         console.log("Ubicacion no válida");
      }

   let validatePrecio = parametros.costo !== undefined && 
      validator.isFloat(parametros.costo.toString(), { min: 0 });
      if (!validateUbicacion) {
         console.log("Ubicacion no válida");
      }


   // if (!validateNombre || !validateDescripcion || !validateUbicacion || !validatePrecio) {
   //    throw new Error("Información no válida");
   // }
}

module.exports = {
   validarEvento
}