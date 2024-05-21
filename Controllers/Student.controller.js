const Student = require('../Schemas/Student.model')
const Khoa = require('../Schemas/Khoa.model')
const getStudents = async(req,res)=>{
    try{
        const student = await Student.find({})
        res.status(200).json(student)
     }catch(error){
         res.status(500).json({message: error.message})
     }
}

const getStudent = async(req,res)=>{
    try{
        const {MaSV} = req.params
        const student = await Student.find({MaSV : MaSV})
        student.map(item=>{
            // console.log(item.NgaySinh.toLocaleDateString())
            res.status(200).send(item)
        })
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
            res.status(400).json({message:'Không tồn tại khoa'})
        }
    }catch(error){
        res.status(500).json({message: error.message})
    }
}

const updateStudent = async (req,res)=>{
    try{
        const {id} = req.params
        const student = await Student.findByIdAndUpdate(id,req.body)
        if(!student){
            return res.status(404).json({message: "Student not found" })
        }
        const updateStudent = await Student.findById(id)
        res.status(200).json(updateStudent)
    }catch(error){
        res.status(500).json({message: error.message})
    }
}

const deleteStudent = async(req,res)=>{
    try{
        const {id} = req.params
        const student = await Student.findByIdAndDelete(id)
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