const Subject = require("../Schemas/Student.model")

//create
const createSubject = async (req,res)=>{
    try{
        const subject = await Subject.create(req.body)
        res.status(200).json(subject)
    }catch(error){
        res.status(500).json({message: error.message})
    }
}

//get list
const getList = async(req,res)=>{
    try{
        const subject = await Subject.find({})
        res.status(200).json(subject)
    }catch(error){
        res.status(500).json({message: error.message})
    }
}

//get one
const getOne = async(req,res)=>{
    try{
        const{id} = req.params
        const subject = await Subject.findOne({MaMH : id})
        if(!subject){
            return res.status(404).json({message: "Subject not found"})
        }else{
            res.status(200).json(subject)
        }
    }catch(error){
        res.status(500).json({message: error.message})
    }
}

module.exports = {
    createSubject,
    getList,
    getOne
}