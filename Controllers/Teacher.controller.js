const Teacher = require("../Schemas/Teacher.model")
const Khoa = require("../Schemas/Khoa.model")
const Subject = require("../Schemas/Student.model")

//create
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

//get list
const getList = async(req,res)=>{
    try{
        const listTeacher = await Teacher.find({})
        res.status(200).json(listTeacher)
    }catch(error){
        res.status(500).json({message: error.message})
    }
}


//get one

const getOne = async(req,res)=>{
    try{
        const{id} = req.params
        const teacher = await Teacher.findOne({MaGV : id})
        if(!teacher){
            res.status(404).json({message:"Teacher not found"})
        }else{
            res.status(200).json(teacher)
        }
    }catch(error){
        res.status(500).json({message: error.message})
    }
}


//update
const updateT = async(req,res)=>{
    try{
        const{id} = req.params
        const teacher = await Teacher.findOneAndUpdate({MaGV : id}, req.body)
        if(!teacher){
            res.status(404).json({message:"Teacher not found"})
        }else{
            const data = await Teacher.findOne({MaGV : id})
            res.status(200).json({message:"Update success", data})
        }
    }catch(error){
        res.status(500).json({message: error.message})
    }
}

//delete
const deleteT = async(req,res)=>{
    try{
        const{id} = req.params
        const teacher = await Teacher.findOneAndDelete({MaGV : id})
        if(!teacher){
            res.status(404).json({message:"Teacher not found"})
            }else{
                res.status(200).json({message:"Delete success", data: teacher})
           }
    }catch(error){
        res.status(500).json({message: error.message})
    }
}

module.exports = {
    createKhoa,
    getList,
    getOne,
    updateT,
    deleteT
}