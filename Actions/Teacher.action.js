const express = require("express")
const router = express.Router()
const teacher = require("../Schemas/Teacher.model")
const {createKhoa} = require("../Controllers/Teacher.controller")


router.post('/',createKhoa)

module.exports = router