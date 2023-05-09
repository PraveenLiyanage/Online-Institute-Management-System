const Timetable = require('../models/timetableModel')
const mongoose = require('mongoose')

// get all timetable
const getTimetables = async (req, res) => {
  const timetables = await Timetable.find({}).sort({createdAt: -1})

  res.status(200).json(timetables)
}

// get a single timetable
const getTimetable= async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such timetable'})
  }

  const timetable = await Timetable.findById(id)

  if (!timetable) {
    return res.status(404).json({error: 'No such timetable'})
  }

  res.status(200).json(timetable)
}

// create a new timetable
const createTimetable = async (req, res) => {
  const {day, time1,time2, time3, time4} = req.body
  
  let emptyFields = []

  if (!day) {
    emptyFields.push('day')
  }
  if (!time1) {
    emptyFields.push('time1')
  }
  
  if (!time2) {
    emptyFields.push('time2')
  }
  if (!time3) {
    emptyFields.push('time3')
  }
  if (!time4) {
    emptyFields.push('time4')
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
  }

  
  // add to the database
  try {
    const timetable = await Timetable.create({ day, time1,time2, time3, time4 })
    res.status(200).json(timetable)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// delete a timetable
const deleteTimetable = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such timetable'})
  }

  const timetable= await Timetable.findOneAndDelete({_id: id})

  if(!timetable) {
    return res.status(400).json({error: 'No such timetable'})
  }

  res.status(200).json(timetable)
}

// update a timetable
const updateTimetable = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such timetable'})
  }

  const timetable = await Timetable.findById(id)

  if (!timetable) {
    return res.status(400).json({error: 'No such timetable'})
  }
  // Update feedback details
  timetable.day = req.body.day || timetable.day
  timetable.time1 = req.body.time1 || timetable.time1
  timetable.time2 = req.body.time2 || timetable.time2
  timetable.time3 = req.body.time3 || timetable.time3
  timetable.time4 = req.body.time4 || timetable.time4

  try {
    const updatedTimetable = await timetable.save()
    res.status(200).json(updatedTimetable)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}
  


module.exports = {
  getTimetables,
  getTimetable,
  createTimetable,
  deleteTimetable,
  updateTimetable
}