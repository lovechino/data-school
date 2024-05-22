const express = require('express')
const router = express.Router()
const{createSchedule,updateBreak,getBreak,getBreaks} = require("../Controllers/Break.controller")
const{authenToken} = require("../Controllers/JWT")



//create
router.post('/',authenToken,createSchedule)


//update
router.put('/',authenToken,updateBreak)


//get list
router.get('/',authenToken,getBreaks)


//get one
router.get('/:id',authenToken,getBreak)



module.exports = router