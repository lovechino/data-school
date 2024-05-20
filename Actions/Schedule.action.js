const express = require("express")
const router = express.Router()
const {createSchedule} = require("../Controllers/Schedule.controller")

router.post('/',createSchedule)

module.exports = router