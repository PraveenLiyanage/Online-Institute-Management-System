const express = require('express')
const {
  createFeedback,
  getFeedbacks,
  getFeedback,
  deleteFeedback,
  updateFeedback,
  getAllFeedbacks
} = require('../controllers/feedbackController')

const {
  getAFeedbacks,
  getAFeedback,
  createAFeedback,
  deleteAFeedback,
  updateAFeedback
} = require('../controllers/AfeedbackController')

const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for some feedback routes
router.post('/', requireAuth, createFeedback)
router.get('/', requireAuth, getFeedbacks)
router.get('/:id', requireAuth, getFeedback)
router.delete('/:id', requireAuth, deleteFeedback)
router.patch('/:id', requireAuth, updateFeedback)
router.get('/all', requireAuth, getAllFeedbacks)

// no auth required for some Afeedback routes
router.get('/', getAFeedbacks) 
router.get('/:id', getAFeedback)
router.post('/', createAFeedback) 
router.delete('/:id', deleteAFeedback) 
router.patch('/:id', updateAFeedback) 

module.exports = router




