const express = require('express')
const router = express.Router()
const Khoa = require("../Schemas/Khoa.model")
const {getKhoas,getKhoa,createKhoa,updateKhoa} = require("../Controllers/Khoa.controller")
const{authenToken,authAd,authAdT} = require("../Controllers/JWT")


//get list
router.get('/',getKhoas)

//crate
router.post('/',createKhoa)

//get one
router.get('/:id',getKhoa)

//update
router.put('/:id',updateKhoa)

module.exports = router