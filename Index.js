const conection = require("./database/conexion");
const express = require("express");
const cors = require("cors");

// Cargar Rutas
const routesAuth = require("./routes/auth")
const routesUser = require("./routes/user")
const routesSubscription = require("./routes/subscription")
const routesAccess = require("./routes/access")
const routesCard = require("./routes/card")



console.log("INICIANDO API Gym Access...")
// Conexion a BDD
conection();
// Crear Servidor Node
const app = express();
const port = 3900;

// Configurar Cors
app.use(cors());

// Convertir los datos del body a objetos JSON
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Cargar enpoints de Rutas
app.use("/gymaccess", routesUser);
app.use("/gymaccess", routesAuth);
app.use("/gymaccess", routesSubscription);
app.use("/gymaccess", routesAccess);
app.use("/gymaccess", routesCard);




// Enlistar el servidor para leer peticiones http
app.listen(port, () =>{
   console.log(`Servidor iniciado en puerto: ${port} para leer peticiones`)
})