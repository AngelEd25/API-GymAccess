const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
    type: { type: String, required: true },  
    price: { type: Number, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    status: { type: String, enum: ['activo', 'inactivo'], default: 'activo'},
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true }); 

const Subscription = mongoose.model('Subscription', subscriptionSchema);
module.exports = Subscription;
