const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// name -> id
const userSchema = new Schema({
    id: String,
    passwd: String,
    data: Object
});

module.exports = mongoose.model('User', userSchema);