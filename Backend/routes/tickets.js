const express = require('express')
const {createTicket, getTicket, getTickets, deleteTicket, updateTicket} = require('../controllers/ticketController')
const router = express.Router()
const tickets = require("../models/ticketModel")


//GET all tickets
router.get('/', getTickets)

//GET single tickets
router.get('/:id', getTicket)

//POST a new tickets
router.post('/', createTicket)

//DELETE tickets
router.delete('/:id', deleteTicket)

//UPDATE tickets
router.patch('/:id', updateTicket)


module.exports = router