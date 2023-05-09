const mongoose = require('mongoose')

const Schema = mongoose.Schema

const noticeSchema = new Schema({
    title : {
        type: String,
        required: true
    },
    note: {
        type:String,
        required : true
    },
    date: {
        type:String,
        required : true
    }
},{ timestamps: true} )

module.exports = mongoose.model('Notice',noticeSchema)
