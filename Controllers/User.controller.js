const Student = require("../Schemas/Student.model")
const Teacher = require("../Schemas/Teacher.model")
const User = require("../Schemas/user.model")
const dotenv = require('dotenv')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {createToken, createRefreshToken} = require('./JWT')
const{sendEmail} = require('./Email')
dotenv.config()

const datakey = process.env.ACCESS_TOKEN_SECRET 

const createUser = async(req,res)=>{
    // try{

    //      const student = await Student.find({})
    //      const user  = await User.find({})
    //      const resStudent = []
    //      const listUser = []
    //      const valueCreate = []
    //      student.map(item=>{
    //         resStudent.push({username : item.MaSV,password : item.NgaySinh.toLocaleDateString()})
    //      })
    //      user.map(item=>{
    //         listUser.push({username : item.username,password : item.password})
    //      })
    //      //remove listUser to resStudent
    //      const resa = resStudent.filter(item=>!listUser.some(item2=>item2.username === item.username))
    //      for(const hash of resa){
    //         const hassPass = await hashPassword(hash.password)
    //         // const newUser = await User.create({username:hash.username,password:hassPass})
    //         const newUser = await User.create({username : hash.username,password : hassPass})
    //         valueCreate.push(newUser)
    //      }
    //      return res.status(200).json({valueCreate})
    // }
    // catch(error){
    //     return res.status(500).json({message:error.message})
    // }
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
        return res.status(200).json({message:"create success"})
    }catch(error){
        return res.status(200).send({message : error.message})
    }
}
let refreshTKs = []

const loginUser = async(req,res)=>{
  const user = await User.findOne({username : req.body.username})
  if(user){
    if(await bcrypt.compare(req.body.password,user.password)){
        // return res.status(200).send({
        //     // role : user.role,
        //     TOKEN :  createToken(user),
        //     user : user
        // })
        const refreshTK = createRefreshToken(user)
        refreshTKs.push(refreshTK)
        if(user.role !== "student"){
            const username = user.username
            const newLogin = await User.findOneAndUpdate({username: username},{        
                  status_0:{
                    online : true,
                    deviceID : user.status_0.deviceID
                  }   
            })
            const checklog = await User.findOne({username : username})
            return res.status(200).send({
                accessToken :  createToken(user),
                refreshToken : refreshTK,
                user : checklog
            })
        }
        else{
            if(user.status_0.deviceID === "NoDevice"){
                const usernane = user.username 
                const newLogin = await User.findOneAndUpdate({username: username},
                    {
                        $set :{
                            status_0:{
                                online : true,
                                // deviceID : req.body.deviceID 
                            }
                        }
                })
                const checkLog = await User.findOne({username : usernane})
                return res.status(200).send({
                    accessToken :  createToken(user),
                    // refreshToken : refreshTK,
                    data : checkLog
                })
            }else{
                const username = user.username 
                const deviceID = user.status_0.deviceID 
                if(deviceID == req.body.deviceID){
                    const newLogin = await User.findOneAndUpdate({username: username},{
                        $set :{
                            status_0:{
                                online : true,
                                deviceID : deviceID
                            }
                        }
                    })
                    const checkLog = await User.findOne({username : username})
                    return res.status(200).send({
                        accessToken :  createToken(user),
                        // refreshToken : refreshTK,
                        data : checkLog
                    })
                }else{
                    return res.status(404).send({
                        message : "Device ID not match"
                    })
                }
            }
        }
    }else{
        return res.status(404).send({
            message : "Password is incorrect"
        })
    }
  }else{
    return res.status(200).send({
        message : "User not found"
    })
  }
}
const hashPassword = async(password)=>{
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password,salt)
}


const refreshToken = async(req,res)=>{
    const refreshToken = req.body.token
    if(refreshToken == null){ return res.sendStatus(401) }
    if(!refreshTKs.includes(refreshToken)) return res.sendStatus(403)
    
    jwt.verify(refreshToken,process.env.REFRESH_tOKEN_SECRET,(err,data)=>{
        if(err) return res.sendStatus(403)
        const accessToken = createToken(data)
        res.json({accessToken : accessToken})
    })
}

const logOut = async(req,res)=>{
    const token = req.headers.authorization.split(' ')[1]
    let username = ""
    let deviceID = ""
    //delete token
    jwt.verify(token,datakey,(err,data)=>{
    //    console.log(data.user)
      const getUsername = data.user.username
      const getDeviceID = data.user.status_0.deviceID
      username += getUsername
      deviceID += getDeviceID
    })
    const log = await User.findOneAndUpdate({username : username},{
        $set :{
            status_0 : {
                online : false,
                deviceID : deviceID
            }
        }
    })
    refreshTKs = refreshTKs.filter(token => token !== req.body.token)
    const checkLog = await User.findOne({username : username})
    res.status(200).send(checkLog)
//    const resa = await User.findOne({username : username})
//     res.status(200).send(resa)
// } 
}


module.exports = {
    createUser,
    createT,
    loginUser,
    logOut,
    refreshToken
}