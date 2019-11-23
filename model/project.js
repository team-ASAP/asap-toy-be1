const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 프로젝트 생성 스키마
const projectSchema = new Schema({
    madeId: String, // 프로젝트 생성자 아이디
    title: String, // 제목
    startDate: Date, // 프로젝트 시작 날짜
    endDate: Date, // 프로젝트 종료 날짜
    maxPeople: Number, // 최대 인원 
    createdDate: Date, // 생성된 날짜 - 수정 불가
    deletedDate: Date, // 삭제된 날짜 - 수정 불가
    modifiedDate: Date, // 수정된 날짜 
    isDeleted: Boolean // 삭제된 포스트인지 확인
});

module.exports = mongoose.model('Project', projectSchema);