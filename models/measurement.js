const mongoose = require('mongoose');

const MeasurementSchema = new mongoose.Schema({
        userId: {
            type: String,
            lowercase: true,
            trim: true,
            index: true,
            required: true
        },
        coordenates: {
            type: String,
            required: true
        },
        value: {
            type: Number,
            required: true
        }
    }, {collection: 'measurement'}
)

module.exports = mongoose.model('Measurement', MeasurementSchema);
