const mongoose = require('mongoose')

const Schema = mongoose.Schema

const appointmentSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  tname: {
    type: String,
    required: true
  },
  user_id: {
    type: String,
    required: false
  }
}, { timestamps: true })

module.exports = mongoose.model('Appointment', appointmentSchema)