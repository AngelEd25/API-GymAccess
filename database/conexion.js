const mongoose = require("mongoose");

const connection =  async () => {
   
   try {
      
      await mongoose.connect("mongodb://mongo:DkvWuzWAMdhNnYnxCRBGMQfMUaaJocND@autorack.proxy.rlwy.net:20007");
      // mongodb://mongo:uWzBsXWSdjrrnYRAtOJPVvtyCmdpsyKz@junction.proxy.rlwy.net:43487
      
      console.log("Conectado a BDD a Gym Access");
   } catch (error) {
      console.log( "No se ha podido conectar correctamente a la BBD Gym Access");
   }
}

module.exports = connection