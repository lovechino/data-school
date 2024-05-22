const express = require('express')
const router = express.Router()
const Khoa = require("../Schemas/Khoa.model")
const {getKhoas,getKhoa,createKhoa,updateKhoa} = require("../Controllers/Khoa.controller")
const{authenToken,authAd,authAdT} = require("../Controllers/JWT")


//get list
router.get('/',authenToken,getKhoas)

//crate
router.post('/',authAd,createKhoa)

//get one
router.get('/:id',authenToken,getKhoa)

//update
router.put('/:id',authenToken,updateKhoa)

module.exports = router