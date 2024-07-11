// models/Advertisement.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdvertisementSchema = new Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    area: { type: Number, required: true },
    image: { type: String },
    userId: { type: Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Advertisement', AdvertisementSchema);