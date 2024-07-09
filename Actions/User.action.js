const express = require('express')
const router = express.Router()
const{createUser,createT,loginUser,logOut} = require("../Controllers/User.controller")
const{authAd,authenToken} = require("../Controllers/JWT")

//create hs
router.post('/',createUser)

//login
router.post('/login',loginUser)

//create gv
router.post('/teacher',authAd,createT)


router.post('/logout',authenToken,logOut)

module.exports = router