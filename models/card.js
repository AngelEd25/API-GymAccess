const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
    lote: { type: String, required: true },  
    status: { type: String, enum: ['activo', 'inactivo'], default: 'activo'},
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

const Card = mongoose.model('Card', cardSchema);
module.exports = Card;
