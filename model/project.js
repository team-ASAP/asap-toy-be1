const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 프로젝트 생성 스키마
const projectSchema = new Schema({
    no: Number,
    madeId: String,
    title: String,
    startDate: Date,
    endDate: Date,
    maxPeople: Number,
    createdDate: Date,
    modifiedDate: Date,
    isDeleted: Boolean
});

module.exports = mongoose.model('Project', projectSchema);