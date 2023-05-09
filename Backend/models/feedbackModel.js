const mongoose = require('mongoose')

const Schema = mongoose.Schema

const feedbackSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  topic: {
    type: String,
    required: true
  },
  user_id: {
    type: String,
    required: false
  }
}, { timestamps: true })

module.exports = mongoose.model('Feedback', feedbackSchema)

