const express = require('express')
const router = express.Router()
const{createSubject,getList,getOne} = require("../Controllers/Subject.controller")
const{authenToken,authAd,authAdT} = require("../Controllers/JWT")

//create
router.post('/',authAd,createSubject)

//get list
router.get('/',authenToken,getList)

//get one
router.get('/:id',authenToken,getOne)
module.exports = router