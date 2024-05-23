const express = require('express')
const router = express.Router()
const{createUser,createT} = require("../Controllers/User.controller")
const{authAd,authenToken} = require("../Controllers/JWT")

//create hs
router.post('/',authAd,createUser)

//login
// router.post('/login',loginUser)

//create gv
router.post('/teacher',authAd,createT)


module.exports = router