const Subject = require("../Schemas/Subject.model")
const Khoa = require("../Schemas/Khoa.model")
//create
const createSubject = async (req,res)=>{
    try{
        // const khoa = await Khoa.find({MaKhoa : req.body.MaKhoa})
        // if(khoa.length == 0){
        //     return res.status(400).json({message : "Khoa không tồn tại" })
        // }else{
        //     const subject = await Subject.create(req.body)
        //     return res.status(200).json(subject)       
        // }
        if(req.body instanceof Array){
          const dataInput = req.body
          const dataArr = Array.from(dataInput)
          const maKhoaData = dataArr.map(item=> ({ MaKhoa: item.MaKhoa }))
          //Remove duplicate data
          const maKhoa = [...new Set(maKhoaData.map(item => item.MaKhoa))]
        //   for(const value of maKhoa){
        //     res.json(value)
        //   }
        const khoa = await Khoa.find({MaKhoa : {$in : maKhoa}})
        if(khoa.length >0){
            const subject = await Subject.create(req.body)
            return res.status(200).json(subject)
        }else{
            return res.status(400).json({message : "Kiểm tra các khoa bạn đã nhập" })
        }
        }
        // return res.status(200).json(req.body instanceof Array)
    }catch(error){
        return res.status(500).json({message: error.message})
    }
}

//get list
const getList = async(req,res)=>{
    try{
        const subject = await Subject.find({})
        return res.status(200).json(subject)
    }catch(error){
        return res.status(500).json({message: error.message})
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
            return res.status(200).json(subject)
        }
    }catch(error){
        return res.status(500).json({message: error.message})
    }
}

module.exports = {
    createSubject,
    getList,
    getOne
}