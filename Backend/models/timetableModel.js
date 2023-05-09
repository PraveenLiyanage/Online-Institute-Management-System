const mongoose = require('mongoose')

const Schema = mongoose.Schema

const timetableSchema = new Schema({
    day : {
        type: String,
        required: true
    },
    time1: {
        type:String,
        required : true
    },
    time2: {
        type:String,
        required : true
    },
    time3: {
        type:String,
        required : true
    },
    time4: {
        type:String,
        required : true
    }


},{ timestamps: true} )

module.exports = mongoose.model('Timetable',timetableSchema)
