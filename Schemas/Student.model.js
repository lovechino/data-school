const mongoose = require('mongoose')
const StudentSchema = mongoose.Schema(
    {
        MaSV :{
            type:String,
            required :[true,"Please enter MaSV"],
            unique: true,
            lowercase :true,
            validate :{
                validator :function(text){
                    return text.length ==6 ===0;
                },
                message :'MaSb must have 6 length'
            }
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
            required :[true,"Please enter GioiTinh"]
        },
        DiaChi:{
            type :String,
            required :[true,"Please enter DiaChi"]
        },
        DienThoai:{
            type :String,
            required :[true,length ==10,"Please enter DienThoai"]
        },
        Email :{
            type :String,
            required :[true,"Please enter Email"]
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
            required :[true,"Please enter TrangThai"]
        }
    },{
        timestamps : true 
    }
)

const Student = mongoose.model("Student",StudentSchema)
module.exports = Student