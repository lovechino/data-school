const Teacher = require("../Schemas/Teacher.model")
const Khoa = require("../Schemas/Khoa.model")
const Subject = require("../Schemas/Student.model")
const createKhoa = async (req,res)=>{
    try{
         const resKhoa = await Khoa.find({MaKhoa : req.body.Khoa})
         const resSub = await Subject.find({MaMH : req.body.BoMon})
         if(resKhoa.length > 0 && resSub.length > 0){
            const teacher = await Teacher.create(req.body)
            res.status(200).json({message : "Tạo thành công", teacher})
         }
         else{
            res.status(400).json({message : "Khoa hoặc bộ môn không tồn tại" })
         }
    }catch(error){
        res.status(500).json({message: error.message})
    }
}
module.exports = {
    createKhoa
}