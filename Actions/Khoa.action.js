const express = require('express')
const router = express.Router()
const Khoa = require("../Schemas/Khoa.model")
const {getKhoas,getKhoa,createKhoa} = require("../Controllers/Khoa.controller")
router.get('/',getKhoas)
router.post('/',createKhoa)

module.exports = router