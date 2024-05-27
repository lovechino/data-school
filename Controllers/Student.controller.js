const Student = require('../Schemas/Student.model')
const Khoa = require('../Schemas/Khoa.model')
const User = require ('../Schemas/user.model')
const {hashPassword} = require('./Handling')
const getStudents = async(req,res)=>{
    try{
        const student = await Student.find({})
        res.status(200).send(student)
     }catch(error){
         res.status(500).json({message: error.message})
     }
}

const getStudent = async(req,res)=>{
    try{
       if(Array.isArray(req.body)){
        const dataInput = req.body
        const handleInput = [];
        for(const value of dataInput){
            const student = await Student.findOne({MaSV : value.MaSV})
            const khoa = await Khoa.findOne({MaKhoa : value.Khoa})
            if(!khoa){
                res.status(400).json({message : `Kiểm tra khoa của ${value.HoTen}` })
            }
            if(!student){
                handleInput.push(value)
            }
        }
       const resStudent = await Student.create(handleInput)
    //    for(const value of resTeacher){
    //     const user = await User.create({username : value.MaGV, password : await hashPassword(value.NgaySinh), role : "teacher" })
    //    }
        const resUser = []
       for(const item of resStudent){
        resUser.push({username : item.MaSV,password : await hashPassword(item.NgaySinh.toLocaleDateString())})
       }
       const resAccount = await User.create(resUser)
       return res.status(200).json({message : "Thêm danh sách và tài khoản học sinh thành công"})
       }else{
        const student = await Student.findOne({MaSV : req.body.MaSV})
        const khoa = await Khoa.findOne({MaKhoa : req.body.Khoa})
        if(!khoa){
            res.status(400).json({message : `Kiểm tra khoa của ${req.body.HoTen}` })
            }
            if(!student){
              const resStudent = await Student.create(req.body)
              const user = await User.create({username :resStudent.MaSV,password : await hashPassword(resStudent.NgaySinh.toLocaleDateString())})
              return res.status(200).json({message:"Tạo thành công học sinh và tài khoản"})
        }
       }
    }catch(error){
        res.status(500).json({message: error.message})
    }
}

const createStudent = async(req,res)=>{
    try {
        // const student = await Student.create(req.body)
        const resKhoa = await Khoa.find({MaKhoa : req.body.Khoa})
        if(resKhoa.length > 0){
            const student = await Student.create(req.body)
            res.status(200).json(student)
        }else{
            res.status(404).json({message:'Không tồn tại khoa'})
        }
    }catch(error){
        res.status(500).json({message: error.message})
    }
}

const updateStudent = async (req,res)=>{
    try{
        const {id} = req.params
        const student = await Student.findOneAndUpdate({MaSV : id},req.body)
        if(!student){
            return res.status(404).json({message: "Student not found" })
        }
        const updateStudent = await Student.findOne({MaSV :id})
        res.status(200).json(updateStudent)
     
    }catch(error){
        res.status(500).json({message: error.message})
    }
}

const deleteStudent = async(req,res)=>{
    try{
        const {id} = req.params
        const student = await Student.findOneAndDelete({MaSV : id})
        if(!student){
            return res.status(404).json({message: "Student not found" })
        }
        res.status(200).json({message: "Student deleted" })
    }catch(error){
        res.status(500).json({message: error.message})
    }
}

module.exports = {
    getStudents,
    getStudent,
    createStudent,
    updateStudent,
    deleteStudent
}