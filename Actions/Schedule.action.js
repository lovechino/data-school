const express = require("express")
const router = express.Router()
const {createSchedule,getListSchedule,listOneSchedule} = require("../Controllers/Schedule.controller")
const{authAd,authenToken} = require("../Controllers/JWT")


router.post('/',authAd,createSchedule)

router.get('/',authenToken,getListSchedule)

router.get('/:id',authenToken,listOneSchedule)

module.exports = router