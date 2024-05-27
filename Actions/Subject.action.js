const express = require('express')
const router = express.Router()
const{createSubject,getList,getOne} = require("../Controllers/Subject.controller")
const{authenToken,authAd,authAdT} = require("../Controllers/JWT")

//create
router.post('/',createSubject)

//get list
router.get('/',getList)

//get one
router.get('/:id',getOne)
module.exports = router