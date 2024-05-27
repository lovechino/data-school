const Khoa = require("../Schemas/Khoa.model")

//get list
const getKhoas = async(req,res)=>{
   try{
    const khoas = await Khoa.find({})
    return res.status(200).json(khoas)
   }catch(err){
    res.status(500).json({message:err.message})
   }
}


//get one
const getKhoa = async(req,res)=>{
    try{
        const {id} = req.params 
        const khoa = await Khoa.find({MaKhoa : id})
        res.status(200).json(khoa)
        }catch(err){
            res.status(500).json({message : err.message})
        }
}

//create
const createKhoa = async(req,res)=>{
    try{
        const khoa = await Khoa.create(req.body)
        res.status(200).json(khoa)
        }catch(err){
            res.status(500).json({message : err.message})
            }
}

//update
const updateKhoa = async(req,res)=>{
    try{
        const {id} = req.params
        const khoa = await Khoa.findOneAndUpdate({MaKhoa : id}, req.body)
        const newUpdate = await Khoa.findOne({MaKhoa :id})
        res.status(200).json(newUpdate)
    }catch(error){
        res.status(500).json({message : error.message})
    }
}

module.exports = {
    getKhoas,
    getKhoa,
    createKhoa,
    updateKhoa
}