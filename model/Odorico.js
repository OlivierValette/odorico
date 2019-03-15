const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SpotSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    address: String,
    description: String,
    image: String,
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true,
        },
        coordinates: {
            type: [Number],
            required: true,
        },
    },
});

module.exports = mongoose.model('spot', SpotSchema);