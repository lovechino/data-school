const mongoose = require('mongoose')
const Khoa = require('../Schemas/Khoa.model')
const StudentSchema = mongoose.Schema(
    {
        MaSV :{
            type:String,
            required :[true,"Please enter MaSV"],
            unique: true,
            minlength: 6,
            maxlength: 6
        },
        Ho_Ten :{
            type :String,
            required :[true,"Please  enter Ho_ten"]
        },
        NgaySinh :{
            type :Date,
            required :[true,"Please enter NgaySinh"]
        },
        GioiTinh :{
            type :String,
            required :[true,"Please enter GioiTinh"],
            enum :['Nam','Nữ','Khác']
        },
        DiaChi:{
            type :String,
            required :[true,"Please enter DiaChi"]
        },
        DienThoai:{
            type :String,
            required :[true,"Please enter DienThoai"],
            match : /^(\+84|0)[0-9]{9}$/
        },
        Email :{
            type :String,
            required :[true,"Please enter Email"],
            match: /^\w+@[a-zA-Z_]+\.[a-zA-Z]{2,}$/
        },
        Khoa :{
            type :String,
            required:[true,"Please enter Khoa"]
        },
        Lop :{
            type :String,
            required :[true,"Please enter Lop"]
        },
        TrangThai:{
            type :String,
            required :[true,"Please enter TrangThai"],
            enum :['Đang học','Đã nghỉ']
        }
    },{
        timestamps : true 
    }
)
const Student = mongoose.model("Student",StudentSchema)
module.exports = Student