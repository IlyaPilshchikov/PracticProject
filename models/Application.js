// models/Application.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ApplicationSchema = new Schema({
    propertyType: { type: String, required: true },
    rooms: { type: Number, required: true },
    contactPhone: { type: String, required: true },
    contactName: { type: String, required: true },
    details: { type: String, required: true },
    purpose: { type: String, required: true }
});

module.exports = mongoose.model('Application', ApplicationSchema);