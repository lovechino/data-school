const express = require('express')
const router = express.Router()
const Student = require('../Schemas/Student.model')
const {getStudents,getStudent,createStudent,updateStudent,deleteStudent} = require('../Controllers/Student.controller') 
const {authenToken,authAd,authAdT} = require('../Controllers/JWT')

//get list 
router.get('/',getStudents)

//get one
router.get('/:MaSV',authenToken,getStudent)

//create
router.post('/',authAd,createStudent)

//update
router.put('/:id',authAd,updateStudent)

//delete
router.delete('/:id',authAd,deleteStudent)

module.exports = router