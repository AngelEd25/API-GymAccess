const validator = require("validator");

const validarUsuario = (parametros) => {
    // Validación de tamaño de texto
    let validateNombres = !validator.isEmpty(parametros.nombres) && 
      validator.isLength(parametros.nombres, { min: 4, max: undefined });

    let validateApellidos = !validator.isEmpty(parametros.apellidos) && 
      validator.isLength(parametros.apellidos, { min: 4, max: undefined });
    
    let validateCorreo = !validator.isEmpty(parametros.correo) &&
        validator.isLength(parametros.correo, { min: 5, max: undefined });

    let validatePassword = !validator.isEmpty(parametros.password) &&
        validator.isLength(parametros.password, { min: 5, max: undefined });

    if (!validateNombres || !validateCorreo || !validatePassword || !validateApellidos) {
        throw new Error("Información no válida");
    }
}

module.exports = {
    validarUsuario
}