const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Join = new mongoose.Schema({
    userId: String,
    projectNo: Number,
    createDate: Date,
    modifiedDate: Date,
    isDeletedDate: Date,
    deleteDate: Date,
    isApproval: Boolean,
    coment: String
});

mongoose.model('Join', Join);