const express = require('express')

const {
  getTimetables, 
  getTimetable, 
  createTimetable, 
  deleteTimetable, 
  updateTimetable
  
} = require('../controllers/timetableControllers')

const router = express.Router()

// GET all timetables
router.get('/', getTimetables)
  
  // GET a single timetables
  router.get('/:id', getTimetable)
  
  // POST a new timetables
  router.post('/', createTimetable)
  
  // DELETE a timetables
  router.delete('/:id', deleteTimetable)

  // UPDATE a timetables
  router.patch('/:id', updateTimetable)

module.exports = router