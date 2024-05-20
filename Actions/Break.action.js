const express = require('express')
const router = express.Router()
const{createSchedule,updateBreak,getBreak,getBreaks} = require("../Controllers/Break.controller")

router.post('/',createSchedule)
router.put('/',updateBreak)
router.get('/',getBreaks)
router.get('/:id',getBreak)

module.exports = router