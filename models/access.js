const mongoose = require('mongoose');

const accessSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    accessGranted: { type: Boolean, required: true }
}, { timestamps: true });

const Access = mongoose.model('Access', accessSchema);
module.exports = Access;
