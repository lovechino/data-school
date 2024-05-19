const mongoose = require("mongoose")

const teachSchema = mongoose.Schema({
    MaGV:{
        type : String,
        required : [true,"Vui lòng nhập mã giảng viên"],
        minLength: 8,
        maxLength:8,
        unique : true
    },
    HoTen:{
        type :String,
        required : [true,"Vui lòng nhập họ tên"],
    },
    NgaySinh:{
        type : Date,
        required : [true,"Vui lòng nhập ngày sinh"],
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
    BoMon :{
        type :String,
        required:[true,"Please enter BoMon"]
    },
    DiaChi :{
        ThanhPho :{
            type :String,
            required:[true,"Please enter ThanhPho"]
        },
        Quan :{
            type :String,
            required:[true,"Please enter Quan"]
        },
        Phuong :{
            type :String,
            required:[true,"Please enter Phuong"]
        },
        Duong :{
            type :String,
            required:[true,"Please enter Duong"]
        }
    }
})

const Teacher = mongoose.model("Teacher",teachSchema)
module.exports = Teacher