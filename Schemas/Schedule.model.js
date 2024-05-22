const mongoose = require("mongoose")

const scheduleSchema = mongoose.Schema({
    MaSV:{
        type :String,
        required : true
    },
    BoMon:{
        type:String,
        ref :'Subject'
    },
    MaGV:{
        type:String,
        ref:'Teacher'     
    }
    ,
    Ngay:{
        type:String,
        enum :['Thứ 2','Thứ 3','Thứ 4','Thứ 5','Thứ 6','Thứ 7'],
    },
    Ca:{
        type :Number,
        enum :[1,2,3,4]
    },
    Phong:{
        type:String,
    }
})

const Schedule = mongoose.model("Schedule",scheduleSchema)
module.exports = Schedule