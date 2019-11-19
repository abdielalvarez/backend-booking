'use strict'
const mongoose =  require('mongoose');
const Schema = mongoose.Schema;

const BookingSchema = Schema({
    _id: mongoose.SchemaTypes.ObjectId,
    area: String,
    place: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Booking', BookingSchema);
