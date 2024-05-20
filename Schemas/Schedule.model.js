const mongoose = require("mongoose")

const scheduleSchema = mongoose.Schema({
    MaSV:{
        type :String,
        required : true
    },
    BoMon:{
        type:String,
        required:true,
        ref :'Subject'
    },
    MaGV:{
        type:String,
        require:true,
        ref:'Teacher'     
    }
    ,
    Ngay:{
        type:String,
        enum :['Thứ 2','Thứ 3','Thứ 4','Thứ 5','Thứ 6','Thứ 7'],
        required:true
    },
    Ca:{
        type :Number,
        required:true,
        enum :[1,2,3,4]
    },
    Phong:{
        type:String,
        required:true,
    }
})

const Schedule = mongoose.model("Schedule",scheduleSchema)
module.exports = Schedule