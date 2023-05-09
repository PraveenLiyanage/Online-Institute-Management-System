const Ticket = require('../models/ticketModel')
const mongoose = require('mongoose')

//GET all ticket
const getTickets = async (req,res) =>{
    const tickets = await Ticket.find({}).sort({createdAt: -1})

    res.status(200).json(tickets)
}

//GRT single ticket
const getTicket = async (req, res) =>{
    const{ id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:' No such Ticket'})
    }

    const ticket = await Ticket.findById(id)

    if(!Ticket){
        return res.status(404).json({error: 'No such Ticket'})
    }

    res.status(200).json(ticket)
}

//CREATE new ticket
const createTicket = async(req, res) => {
    const { sname, email, contNo, module, inquiry, message} = req.body
    let emptyFields = []

  if (!sname) {
    emptyFields.push('sname')
  }
  if (!email) {
    emptyFields.push('email')
  }
  if (!contNo) {
    emptyFields.push('contNo')
  }
  if (!module) {
    emptyFields.push('module')
  }
  if (!inquiry) {
    emptyFields.push('inquiry')
  }
  if (!message) {
    emptyFields.push('message')
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
  }
    // add to database
    try{
        const ticket = await Ticket.create({sname, email, contNo, module, inquiry, message})
        res.status(200).json(ticket)
    }catch (error){
        res.status(400).json({error: error.message})
    }
}


//DELETE a ticket
const deleteTicket = async (req, res)=>{
    const{ id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:' No such Ticket'})
    }

    const ticket = await Ticket.findOneAndDelete({_id: id})
    if(!ticket){
        return res.status(404).json({error: 'No such Ticket'})
    }
    res.status(200).json(ticket)
}

//UPDATE a ticket
const updateTicket = async (req,res) =>{
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:' No such Ticket'})
    }

    const ticket = await Ticket.findById(id)

    if(!module) {
        return res.status(400).json({err: 'No such Modules'})
    }

     // Update  details
    ticket.sname = req.body.sname || ticket.sname
    ticket.email = req.body.email || ticket.email
    ticket.contNo = req.body.contNo || ticket.contNo
    ticket.module = req.body.module || ticket.module
    ticket.inquiry = req.body.inquiry || ticket.inquiry
    ticket.message = req.body.message || ticket.message
 
  

  try {
    const updateTicket = await ticket.save()
    res.status(200).json(updateTicket)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
  }

module.exports = {
    getTickets,
    getTicket,
    createTicket,
    deleteTicket,
    updateTicket,
}