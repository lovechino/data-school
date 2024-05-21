const mongoose = require('mongoose')
const userSchema = mongoose.Schema(
    {
        username:{
            type:String,
            required:[true,"Vui lòng nhập tên tài khoản"],
            unique : true
        },
        password:{
            type:String,
            required:[true,"Vui lòng nhập mật khẩu"],
        },
        role:{
            type:String,
            required:true,
            enum :['admin','teacher','student'],
            default: 'student'
        }
    }
)

const user = mongoose.model("user",userSchema)
module.exports = user