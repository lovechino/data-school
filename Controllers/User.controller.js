const Student = require("../Schemas/Student.model")
const Teacher = require("../Schemas/Teacher.model")
const bcrypt = require('bcrypt')
const User = require("../Schemas/user.model")
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')
const {createToken} = require('./JWT')
const{sendEmail} = require('./Email')
dotenv.config()

const createUser = async(req,res)=>{
    try{

         const student = await Student.find({})
         const user  = await User.find({})
         const resStudent = []
         const listUser = []
         const valueCreate = []
         student.map(item=>{
            resStudent.push({username : item.MaSV,password : item.NgaySinh.toLocaleDateString()})
         })
         user.map(item=>{
            listUser.push({username : item.username,password : item.password})
         })
         //remove listUser to resStudent
         const resa = resStudent.filter(item=>!listUser.some(item2=>item2.username === item.username))
         for(const hash of resa){
            const hassPass = await hashPassword(hash.password)
            // const newUser = await User.create({username:hash.username,password:hassPass})
            const newUser = await User.create({username : hash.username,password : hassPass})
            valueCreate.push(newUser)
         }

         res.status(200).json({valueCreate})
       
      
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
}

const createT = async(req,res)=>{
    try{
        const teacher = await Teacher.find({})
        const user = await User.find({})
        const resTeacher = []
        const restUser = []
        teacher.map(item=>{
            resTeacher.push({username : item.MaGV,password : item.NgaySinh.toLocaleDateString()})
        })
        user.map(item=>{
            restUser.push({username : item.username,password : item.password})
        })
        //remove listUser to resTeacher
        const resdata = resTeacher.filter(item=>!restUser.some(item2=>item2.username === item.username))
        for(const hash of resdata){
            const hassPass = await hashPassword(hash.password)
            const newUser = await User.create({username : hash.username,password : hassPass,role : 'teacher'})
        }
        res.status(200).json({message:"create success"})
    }catch(error){
        res.status(200).send({message : error.message})
    }
}

const loginUser = async(req,res)=>{
  const user = await User.findOne({username : req.body.username})
  if(user){
    if(bcrypt.compare(req.body.password,user.password)){
        res.send({
            role : user.role,
            TOKEN :  createToken(user)
        })
    }
  }
//   await sendEmail({
//     email :'tempest2k2x@gmail.com',
//     subject :'m ngu vl',
//     message:'test message'
//   })
}
const hashPassword = async(password)=>{
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password,salt)
}


module.exports = {
    createUser,
    createT,
    loginUser
}