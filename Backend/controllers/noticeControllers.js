const Notice = require('../models/noticeModel')
const mongoose = require('mongoose')

// get all notice
const getNotices = async (req, res) => {
  const notices = await Notice.find({}).sort({createdAt: -1})

  res.status(200).json(notices)
}

// get a single notice
const getNotice= async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such notice'})
  }

  const notice = await Notice.findById(id)

  if (!notice) {
    return res.status(404).json({error: 'No such notice'})
  }

  res.status(200).json(notice)
}

// create a new notice
const createNotice = async (req, res) => {
  const {title, note,date} = req.body
  
  let emptyFields = []

  if (!title) {
    emptyFields.push('title')
  }
  if (!note) {
    emptyFields.push('note')
  }
  
  if (!date) {
    emptyFields.push('date')
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
  }

  
  // add to the database
  try {
    const notice = await Notice.create({ title,note,date })
    res.status(200).json(notice)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// delete a notice
const deleteNotice = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such notice'})
  }

  const notice= await Notice.findOneAndDelete({_id: id})

  if(!notice) {
    return res.status(400).json({error: 'No such notice'})
  }

  res.status(200).json(notice)
}

// update a notice
const updateNotice = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such notice'})
  }

  const notice = await Notice.findById(id)

  if (!notice) {
    return res.status(400).json({error: 'No such notice'})
  }
  // Update feedback details
  notice.title = req.body.title || notice.title
  notice.note = req.body.note || notice.note
  notice.date = req.body.date || notice.date

  try {
    const updatedNotice = await notice.save()
    res.status(200).json(updatedNotice)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}
  


module.exports = {
  getNotices,
  getNotice,
  createNotice,
  deleteNotice,
  updateNotice
}