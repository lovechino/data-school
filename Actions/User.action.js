const express = require('express')
const router = express.Router()
const{createUser,loginUser} = require("../Controllers/User.controller")

router.post('/',createUser)
router.post('/login',loginUser)

module.exports = router