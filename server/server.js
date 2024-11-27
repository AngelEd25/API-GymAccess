const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/calendar', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Conectado a la base de datos MongoDB');
}).catch(err => {
    console.log('Error al conectar a la base de datos:', err);
});

app.listen(3000, () => {
    console.log('Servidor corriendo en el puerto 3000');
});