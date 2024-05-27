const mongoose = require('mongoose')

const khoaSchema = mongoose.Schema({
    MaKhoa:{
        type :String,
        required : true,
        unique:true,
        maxlength : 8
    },
    TenKhoa :{
        type : String,
        required : true,
        unique : true
    }
    // ,
    // DienThoai :{
    //     type : String,
    //     required : true,
    //     match: /^(\+84|0)[0-9]{9}$/
    // }
})

const Khoa = mongoose.model("Khoa",khoaSchema)
module.exports = Khoa