const Feedback = require('../models/feedbackModel')
const mongoose = require('mongoose')

// get all feedbacks
const getFeedbacks = async (req, res) => {
  const user_id = req.user._id

  const feedbacks = await Feedback.find({user_id}).sort({createdAt: -1})

  res.status(200).json(feedbacks)
}

// get a single feedback
const getFeedback = async (req, res) => {
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


// create new feedback
const createFeedback = async (req, res) => {
  const {name, topic, description} = req.body

  let emptyFields = []

  if(!name) {
    emptyFields.push('name')
  }
  if(!topic) {
    emptyFields.push('topic')
  }
  if(!description) {
    emptyFields.push('description')
  }
  if(emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
  }

  // add doc to db
  try {
    const user_id = req.user._id
    const feedback = await Feedback.create({name, topic, description, user_id})
    res.status(200).json(feedback)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// delete a feedback
const deleteFeedback = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such feedback'})
  }

  const feedback = await Feedback.findOneAndDelete({_id: id})

  if (!feedback) {
    return res.status(400).json({error: 'No such feedback'})
  }

  res.status(200).json(feedback)
}


// update a feedback
const updateFeedback = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such feedback'})
  }

  const feedback = await Feedback.findById(id)

  if (!feedback) {
    return res.status(404).json({error: 'No such feedback'})
  }

  // Update feedback details
  feedback.name = req.body.name || feedback.name
  feedback.topic = req.body.topic || feedback.topic
  feedback.description = req.body.description || feedback.description

  try {
    const updatedFeedback = await feedback.save()
    res.status(200).json(updatedFeedback)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}
const getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({createdAt: -1});
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};



module.exports = {
  getFeedbacks,
  getFeedback,
  createFeedback,
  deleteFeedback,
  updateFeedback,
  getAllFeedbacks
}
