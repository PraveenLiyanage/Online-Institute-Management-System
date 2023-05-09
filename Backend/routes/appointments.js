/*const express = require('express')
const {
  createAppointment,
  getAppointments,
  getAppointment,
  deleteAppointment,
  updateAppointment
} = require('../controllers/appointmentController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all appointment routes
router.use(requireAuth)

// GET all appointments
router.get('/', getAppointments)

//GET a single appointment
router.get('/:id', getAppointment)

// POST a new appointment
router.post('/', createAppointment)

// DELETE a appointment
router.delete('/:id', deleteAppointment)

// UPDATE a appointment
router.patch('/:id', updateAppointment)


module.exports = router*/
const express = require('express')
const {
  createAppointment,
  getAppointments,
  getAppointment,
  deleteAppointment,
  updateAppointment,
  getAllAppointments
} = require('../controllers/appointmentController')

const {
  getAAppointments,
  getAAppointment,
  createAAppointment,
  deleteAAppointment,
  updateAAppointment
} = require('../controllers/AappointmentController')

const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for some appointment routes
router.post('/', requireAuth, createAppointment)
router.get('/', requireAuth, getAppointments)
router.get('/:id', requireAuth, getAppointment)
router.delete('/:id', requireAuth, deleteAppointment)
router.patch('/:id', requireAuth, updateAppointment)
router.get('/all', requireAuth, getAllAppointments)

// no auth required for some Aappointment routes
router.get('/', getAAppointments) 
router.get('/:id', getAAppointment)
router.post('/', createAAppointment) 
router.delete('/:id', deleteAAppointment) 
router.patch('/:id', updateAAppointment) 

module.exports = router





