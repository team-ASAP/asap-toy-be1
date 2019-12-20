const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//schema
const dormantUserSchema = new Schema({
  id: {
    type: String,
    required: [true, ' Id is required!'],
    match: [/^.{4,12}$/, 'Should be 4-12 characters!'],
    trim: true,
    unique: true,
  },
  passwd: {
    type: String,
    required: [true, 'Password is required!'],
    select: false,
  },
  salt: {
    type: String
  },
  data: Object,
});

module.exports = mongoose.model('dormantUser', dormantUserSchema);
