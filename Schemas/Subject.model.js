const mongoose = require('mongoose')

const subjectSchema = mongoose.Schema({
    MaMH:{
        type:String,
        required:true,
        unique : true
    },
    TenMH:{
        type:String,
        required:true,
        unique : true
    }
})

const Subject = mongoose.model("Subject")
module.exports = Subject