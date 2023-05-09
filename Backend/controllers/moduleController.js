const Module = require('../models/moduleModel')
const mongoose = require('mongoose')

// Get all modules
const getModules = async (req, res) =>{
    const module = await Module.find({}).sort({createdAt: -1})

    res.status(200).json(module)
}

// Get single module
const getModule = async( req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({err: 'No such Module'})
    }

    const module = await Module.findById(id)

    if(!module) {
        return res.status(404).json({err: 'No such Modules'})
    }

    res.status(200).json(module)
}


// Create new module
const createModule = async( req, res) => {
    const {Title, Description} = req.body

    let emptyFields = []

    if(!Title) {
        emptyFields.push('Title')
    }

    if(!Description) {
        emptyFields.push('Description')
    }

    if(emptyFields.length > 0) {
        return res.status(400).json({err: 'Please fill in all the fields', emptyFields})
    }

    /*if(req.file){
        Module.Video = req.file.path
    }*/
    
// Add doc to database
try{
    const module = await Module.create({Title, Description})
    res.status(200).json(module)
} catch (err){
    res.status(400).json({err: err.message})
}
}

// Delete a module
const deleteModule = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({err: 'No such Module'})
    }

    const module = await Module.findOneAndDelete({_id: id})

    if(!module) {
        return res.status(400).json({err: 'No such Modules'})
    }

    res.status(200).json(module)
}


// Update a module
const updateModule = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({err: 'No such Module'})
    }

    const module = await Module.findById(id)

    if(!module) {
        return res.status(400).json({err: 'No such Modules'})
    }

     // Update module details
  module.Title = req.body.Title || module.Title
  module.Description = req.body.Description || module.Description
  

  try {
    const updatedmodule = await module.save()
    res.status(200).json(updatedmodule)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
  }



module.exports = {
    getModule,
    getModules,
    createModule,
    deleteModule,
    updateModule
}