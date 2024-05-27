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
    },
    MaKhoa :{
        type:String,
        required:true
    }
})

const Subject = mongoose.model("Subject",subjectSchema)
module.exports = Subject