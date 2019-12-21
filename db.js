const mongoose = require('mongoose');
const mongoDB = require('./config').mongoDB;

module.exports = () => {
    function connect(){
        mongoose.connect(mongoDB.DBHOST, { useNewUrlParser: true },(err) => {
            if(err){
                console.error('mongodb connection error', err);
            }
            console.log('mongodb connected');
        });
    }
    connect();

    mongoose.connection.on('disconnected', connect);
};