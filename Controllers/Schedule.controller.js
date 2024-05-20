const Subject = require("../Schemas/Subject.model")
const Schedule = require("../Schemas/Schedule.model")
const Student = require("../Schemas/Student.model")
const Teacher = require("../Schemas/Teacher.model")
const createSchedule = async(req,res)=>{
    try{
        const resSub = await Subject.find({MaMH : req.body.BoMon})
        const resTea = await Teacher.find({MaGV :req.body.MaGV})
        const resStu = await Student.find({MaSV :req.body.MaSV})
        if(resSub.length > 0 && resTea.length > 0 && resStu.length >0){
            const schedule = await Schedule.create(req.body)
            res.status(200).json({message:"Tạo lịch học thành công",schedule})
        }
    }catch(error){
        res.status(500).json({message:error})
    } 
}
module.exports = {
    createSchedule
}