const express = require("express")
const router = express.Router()
const teacher = require("../Schemas/Teacher.model")
const {create,getList,getOne,updateT,deleteT} = require("../Controllers/Teacher.controller")
const{authenToken,authAd,authAdT} = require("../Controllers/JWT")

//create
router.post('/',create)

//get list
router.get('/',getList)

//get one
router.get('/:id',getOne)

//update
router.put('/:id',updateT)

//delete
router.delete('/:id',deleteT)

module.exports = router