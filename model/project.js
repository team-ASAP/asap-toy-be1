const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 프로젝트 생성 스키마
const projectSchema = new Schema({
<<<<<<< HEAD
    no: Number,
=======
>>>>>>> 650f53c42f659b0ed4ec840828a3824106ff448c
    madeId: String,
    title: String,
    startDate: Date,
    endDate: Date,
    maxPeople: Number,
    createdDate: Date,
<<<<<<< HEAD
=======
    deletedDate: Date,
>>>>>>> 650f53c42f659b0ed4ec840828a3824106ff448c
    modifiedDate: Date,
    isDeleted: Boolean
});

module.exports = mongoose.model('Project', projectSchema);