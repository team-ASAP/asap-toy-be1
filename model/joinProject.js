const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const joinSchema = new Schema({
    userId: String,
    projectNo: Number,
    createDate: Date,
    modifiedDate: Date,
    isDeleted: { type:Boolean, default:false },
    deleteDate: Date,
    isApproval: { type: Boolean, default:false },
    comment: String
});

module.exports = mongoose.model('JoinProject', joinSchema);