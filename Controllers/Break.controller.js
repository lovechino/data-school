const Student = require("../Schemas/Student.model")
const Break = require("../Schemas/Schedule.model")

//create
const createSchedule = async(req,res)=>{
    try{
        const student = await Student.find({MaSV : req.body.MaSV})
        const resBreak = await Break.find({MaSV : req.body.MaSV})
        if(student.length >0 && resBreak.length ==0){
            const Newbreak = await Break.create(req.body)
            res.status(200).json({message : "Thêm giờ nghỉ thành công", data : Newbreak})
        }else{
            res.status(400).json({message : "Đã tồn tại"})
        }
    }catch(error){
        res.status(500).json({message : error})
    }
}

//update
const updateBreak = async(req,res)=>{
    try{
        const subBreak = await Break.find({MaSV : req.body.MaSV})
        const updateBreak = []
        subBreak.map((item)=>
            updateBreak.push(item.break)
        )
        updateBreak.push({'ThoiGian':req.body.ThoiGian})
        const update = await Break.updateOne({MaSV : req.body.MaSV},{$set : {break : updateBreak}})
        res.status(200).json({message : "Cập nhật giờ nghỉ thành công", data : update})

    }catch(error){
        res.status(500).json({message : error})
    }
}

//get list
const getBreaks = async(req,res)=>{
    try{
        const abreak = await Break.find({})
        res.status(200).json({message : "Lấy giờ nghỉ thành công", data : abreak})
    }catch(error){
        res.status(500).json({message : error})
    }
}

//get one
const getBreak = async(req,res)=>{
    try{
        const{id} = req.params
        const abreak = await Break.find({MaSV : id})
        if(abreak.length > 0){
            res.status(200).json({message : "Lấy giờ nghỉ thành công", data : abreak})
        }
        else{
            res.status(400).json({message : "Không tồn tại"})
        }
    }catch(error){
        res.status(500).json({message : error})
    }
}


module.exports = {
    createSchedule,
    updateBreak,
    getBreaks,
    getBreak
}