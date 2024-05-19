const Khoa = require("../Schemas/Khoa.model")

const getKhoas = async(req,res)=>{
    try{
        const khoas = await Khoa.find({})
        res.status(200).json({khoas})
        }catch(err){
            res.status(500).json({err})
            }
}

const getKhoa = async(req,res)=>{
    try{
        const {MaKhoa} = req.params 
        const khoa = await Khoa.find({MaKhoa : MaKhoa})
        res.status(200).json({khoa})
        }catch(err){
            res.status(500).json({err})
        }
}

const createKhoa = async(req,res)=>{
    try{
        const khoa = await Khoa.create(req.body)
        res.status(200).json({khoa})
        }catch(err){
            res.status(500).json({err})
            }
}

module.exports = {
    getKhoas,
    getKhoa,
    createKhoa
}