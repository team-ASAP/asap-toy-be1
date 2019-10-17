const mongoose = require('mongoose');
const Schema = mongoose.Schema;

<<<<<<< HEAD
//schema
const userSchema = new Schema({
  id: {
    type: String,
    required: [true, ' Id is required!'],
    match: [/^.{4,12}$/, 'Should be 4-12 characters!'],
    trim: true,
    unique: true,
  },
  passwd: {
    type: String,
    required: [true, 'Password is required!']
  },
  salt: {
    type: String
  },
  salt: {
    type: String
  },
  data: Object,
=======
// name -> id
const userSchema = new Schema({
    id: String,
    passwd: String,
    data: Object
>>>>>>> project schema, get post add
});

module.exports = mongoose.model('User', userSchema);
