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
    required: [true, 'Password is required!']
  },
  salt: {
    type: String
  },
  data: Object,
  createdDate: Date, // 생성된 날짜 - 수정 불가
  deletedDate: Date, // 삭제된 날짜 - 수정 불가
  modifiedDate: Date, // 수정된 날짜 
  isDeleted: Boolean // 삭제된 포스트인지 확인
});

module.exports = mongoose.model('dormantUser', dormantUserSchema);
