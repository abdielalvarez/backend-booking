'use strict'
var mongoose =  require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
    _id: mongoose.SchemaTypes.ObjectId,
    name: String,
    email: String
});

module.exports = mongoose.model('User', UserSchema);
