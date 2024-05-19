const express = require("express")
const mongoose = require("mongoose")
const Student = require("./Schemas/Student.model")
const app = express()

app.use(express.json())


app.post('/api/students',async (req,res)=>{
    try {
        const student = await Student()
        res.status(200).json(student)
    }catch(error){
        res.status(500).json({message: error.message})
    }
})

mongoose.connect("mongodb+srv://admin:achinchin2kx@cluster0.xelldvi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(
    ()=>{
        app.listen(3000,()=>{
           console.log("Kết nối thành công")
        })
    }
)
.catch(()=>console.log("Kết nối thất bại!"))

