const Feedback = require('../models/feedbackModel')
const mongoose = require('mongoose')

// get all feedbacks
const getAFeedbacks = async (req, res) => {
  const feedbacks = await Feedback.find({}).sort({createdAt: -1})

  res.status(200).json(feedbacks)
}

// get a single feedback
const getAFeedback = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such feedback'})
  }

  const feedback = await Feedback.findById(id)

  if (!feedback) {
    return res.status(404).json({error: 'No such feedback'})
  }

  res.status(200).json(feedback)
}

// create a new feedback
const createAFeedback = async (req, res) => {
  const {name, description, topic} = req.body

  let emptyFields = []

  if (!name) {
    emptyFields.push('name')
  }
  if (!description) {
    emptyFields.push('description')
  }
  if (!topic) {
    emptyFields.push('topic')
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
  }

  // add to the database
  try {
    const feedback = await Feedback.create({ name, description, topic })
    res.status(200).json(feedback)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// delete a feedback
const deleteAFeedback = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such feedback'})
  }

  const feedback = await Feedback.findOneAndDelete({_id: id})

  if(!feedback) {
    return res.status(400).json({error: 'No such feedback'})
  }

  res.status(200).json(feedback)
}

// update a feedback
const updateAFeedback = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such feedback'})
  }

  const feedback = await Feedback.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!feedback) {
    return res.status(400).json({error: 'No such feedback'})
  }

  res.status(200).json(feedback)
}

module.exports = {
  getAFeedbacks,
  getAFeedback,
  createAFeedback,
  deleteAFeedback,
  updateAFeedback
}