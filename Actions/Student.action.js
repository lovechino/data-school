const express = require('express')
const router = express.Router()
const Student = require('../Schemas/Student.model')
const {getStudents,getStudent,createStudent,updateStudent,deleteStudent} = require('../Controllers/Student.controller') 

router.get('/',getStudents)

router.get('/:id',getStudent)

router.post('/',createStudent)

router.put('/:id',updateStudent)

router.delete('/:id',deleteStudent)

module.exports = router