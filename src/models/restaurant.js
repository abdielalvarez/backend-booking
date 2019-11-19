'use strict'
var mongoose =  require('mongoose');
var Schema = mongoose.Schema;

var RestaurantSchema = Schema({
    _id: mongoose.SchemaTypes.ObjectId,
    name: String,
    type: String,
});

module.exports = mongoose.model('Restaurant', RestaurantSchema);