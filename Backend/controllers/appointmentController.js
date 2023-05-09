const Appointment = require('../models/appointmentModel')
const mongoose = require('mongoose')

// get all appointments
const getAppointments = async (req, res) => {
  const user_id = req.user._id

  const appointments = await Appointment.find({user_id}).sort({createdAt: -1})

  res.status(200).json(appointments)
}

// get a single appointment
const getAppointment = async (req, res) => {
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


// create new appointment
const createAppointment = async (req, res) => {
  const {name, tname, date} = req.body

  let emptyFields = []

  if(!name) {
    emptyFields.push('name')
  }
  if(!tname) {
    emptyFields.push('tname')
  }
  if(!date) {
    emptyFields.push('date')
  }
  if(emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
  }

  // add doc to db
  try {
    const user_id = req.user._id
    const appointment = await Appointment.create({name, tname, date, user_id})
    res.status(200).json(appointment)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// delete a appointment
const deleteAppointment = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such appointment'})
  }

  const appointment = await Appointment.findOneAndDelete({_id: id})

  if (!appointment) {
    return res.status(400).json({error: 'No such appointment'})
  }

  res.status(200).json(appointment)
}

/*// update a appointment
const updateAppointment = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such appointment'})
  }

  const appointment = await Appointment.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!appointment) {
    return res.status(400).json({error: 'No such appointment'})
  }

  res.status(200).json(appointment)
}*/
const updateAppointment = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such appointment'})
  }

  const appointment = await Appointment.findById(id)

  if (!appointment) {
    return res.status(404).json({error: 'No such appointment'})
  }

  // Update appointment details
  appointment.name = req.body.name || appointment.name
  appointment.tname = req.body.tname || appointment.tname
  appointment.date = req.body.description || appointment.date

  try {
    const updatedAppointment = await appointment.save()
    res.status(200).json(updatedAppointment)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
  
}
const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({createdAt: -1});
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};


module.exports = {
  getAppointments,
  getAppointment,
  createAppointment,
  deleteAppointment,
  updateAppointment,
  getAllAppointments
}