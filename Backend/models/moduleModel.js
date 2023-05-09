const mongoose = require('mongoose')

const Schema = mongoose.Schema

const moduleSchema = new Schema({
    Title: {
        type: String,
        required: true
    },

    Description:{
        type: String,
        required: true
    },


}, { timestamps: true})

module.exports = mongoose.model('Module', moduleSchema)