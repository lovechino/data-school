const mongoose = require('mongoose')

const breakSchedule = mongoose.Schema(
    {
        MaSV:{
            type : String,
            required : true,
            ref:'Student'
        },
        break:[
            {
                ThoiGian:{
                    type:Date,
                    required:true
                }
            }
        ]
    }
)
const Break = mongoose.model("Break",breakSchedule)
module.exports = Break