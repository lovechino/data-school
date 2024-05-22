const express = require("express")
const router = express.Router()
const teacher = require("../Schemas/Teacher.model")
const {createKhoa,getList,getOne,updateT,deleteT} = require("../Controllers/Teacher.controller")
const{authenToken,authAd,authAdT} = require("../Controllers/JWT")

//create
router.post('/',authAd,createKhoa)

//get list
router.get('/',authenToken,getList)

//get one
router.get('/:id',authenToken,getOne)

//update
router.put('/:id',authAd,updateT)

//delete
router.delete('/:id',authAd,deleteT)

module.exports = router