const express = require('express')
const router = express.Router()
const{createSubject} = require("../Controllers/Subject.controller")

router.post('/',createSubject)

module.exports = router