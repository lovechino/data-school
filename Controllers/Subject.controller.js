const Subject = require("../Schemas/Student.model")

const createSubject = async (req,res)=>{
    try{
        const subject = await Subject.create(req.body)
        res.status(200).json(subject)
    }catch(error){
        res.status(500).json({message: error.message})
    }
}

module.exports = {createSubject}