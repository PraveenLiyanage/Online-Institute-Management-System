const express = require('express')

const {
  getNotices, 
  getNotice, 
  createNotice, 
  deleteNotice, 
  updateNotice
  
} = require('../controllers/noticeControllers')

const router = express.Router()

// GET all notices
router.get('/', getNotices)
  
  // GET a single notices
  router.get('/:id', getNotice)
  
  // POST a new notices
  router.post('/', createNotice)
  
  // DELETE a notices
  router.delete('/:id', deleteNotice)

  // UPDATE a notices
  router.patch('/:id', updateNotice)

module.exports = router