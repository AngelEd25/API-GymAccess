const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    address: { type: String, required: false },
    birthdate: { type: Date, required: false },
    gender: { type: String, enum: ['male', 'female', 'other'], required: false },
    cardUID: { type: String },
    image: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'trainer', 'user'], default: 'user' },
    status: { type: String, enum: ['active', 'inactive', 'suspended'], default: 'active'},
    card: { type: mongoose.Schema.Types.ObjectId, ref: 'Card'},
    subscription: { type: mongoose.Schema.Types.ObjectId, ref: 'Subscription' }
}, { timestamps: true });

// Encriptación de contraseña
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;
