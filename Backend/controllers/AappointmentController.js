const Appointment = require('../models/appointmentModel')
const mongoose = require('mongoose')

// get all appointments
const getAAppointments = async (req, res) => {
  const appointments = await Appointment.find({}).sort({createdAt: -1})

  res.status(200).json(appointments)
}

// get a single appointment
const getAAppointment = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such appointment'})
  }

  const appointment = await Appointment.findById(id)

  if (!appointment) {
    return res.status(404).json({error: 'No such appointment'})
  }

  res.status(200).json(appointment)
}

// create a new appointment
const createAAppointment = async (req, res) => {
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
    const appointment = await Appointment.create({ name, description, topic })
    res.status(200).json(appointment)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// delete a appointment
const deleteAAppointment = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such appointment'})
  }

  const appointment = await Appointment.findOneAndDelete({_id: id})

  if(!appointment) {
    return res.status(400).json({error: 'No such appointment'})
  }

  res.status(200).json(appointment)
}

// update a appointment
const updateAAppointment = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such appointment'})
  }

  const appointment = await Appointment.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!appointment) {
    return res.status(400).json({error: 'No such appointment'})
  }

  res.status(200).json(appointment)
}


module.exports = {
  getAAppointments,
  getAAppointment,
  createAAppointment,
  deleteAAppointment,
  updateAAppointment
  
}