const Teacher = require("../Schemas/Teacher.model")
const Khoa = require("../Schemas/Khoa.model")
const Subject = require("../Schemas/Student.model")
const User = require("../Schemas/user.model")
const {hashPassword}  = require("./Handling")
//create
const create = async (req,res)=>{
    // try{
    //      const resKhoa = await Khoa.find({MaKhoa : req.body.Khoa})
    //      const resSub = await Subject.find({MaMH : req.body.BoMon})
    //      if(resKhoa.length > 0 && resSub.length > 0){
    //         const teacher = await Teacher.create(req.body)
    //         res.status(200).json({message : "Tạo thành công", teacher})
    //      }
    //      else{
    //         res.status(400).json({message : "Khoa hoặc bộ môn không tồn tại" })
    //      }
    // }catch(error){
    //     res.status(500).json({message: error.message})
    // }
    try{
        if(Array.isArray(req.body)){
            const dataInput = req.body
            const handleInput = [];
            for(const value of dataInput){
                const teacher = await Teacher.findOne({MaGV : value.MaGV})
                const khoa = await Khoa.findOne({MaKhoa : value.Khoa})
                if(!khoa){
                    res.status(400).json({message : `Kiểm tra khoa của ${value.HoTen}` })
                }
                if(!teacher){
                    handleInput.push(value)
                }
            }
           const resTeacher = await Teacher.create(handleInput)
        //    for(const value of resTeacher){
        //     const user = await User.create({username : value.MaGV, password : await hashPassword(value.NgaySinh), role : "teacher" })
        //    }
            const resUser = []
           for(const item of resTeacher){
            resUser.push({username : item.MaGV,password : await hashPassword(item.NgaySinh.toLocaleDateString()),role :'teacher'})
           }
           const resAccount = await User.create(resUser)
           return res.status(200).json({message : "Thêm danh sách và tài khoản giáo viên thành công"})
        }
        else{
            const teacher = await Teacher.findOne({MaGV : req.body.MaGV})
            const khoa = await Khoa.findOne({MaKhoa : req.body.Khoa})
            if(!khoa){
                res.status(400).json({message : `Kiểm tra khoa của ${req.body.HoTen}` })
                }
                if(!teacher){
                  const resTeacher = await Teacher.create(req.body)
                  const user = await User.create({username :resTeacher.MaGV,password : await hashPassword(resTeacher.NgaySinh.toLocaleDateString()),role : 'teacher'})
                  return res.status(200).json({message:"Tạo thành công giản viên và tài khoản"})
            }
        }
    }catch(err){
        return res.status(500).json({message : err.message})
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
    create,
    getList,
    getOne,
    updateT,
    deleteT
}