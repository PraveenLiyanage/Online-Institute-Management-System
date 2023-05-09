const express = require('express')

const {
    createModule,
    getModule,
    getModules,
    deleteModule,
    updateModule
} = require('../controllers/moduleController')
// const upload = require('../Middleware/upload')

const router = express.Router()

// Get all modules

router.get('/', getModules)

// GET a single module

router.get('/:id', getModule)

// POST a new module

router.post('/',createModule)

// DELETE a module

router.delete('/:id', deleteModule)

// UPDATE a module

router.patch('/:id', updateModule)



module.exports = router