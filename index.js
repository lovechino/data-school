const express = require("express")
const mongoose = require("mongoose")
const Student = require("./Schemas/Student.model")
const studentAction = require("./Actions/Student.action")
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use("/api/students",studentAction)




mongoose.connect("mongodb+srv://admin:achinchin2kx@cluster0.xelldvi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(
    ()=>{
        app.listen(3000,()=>{
           console.log("Kết nối thành công")
        })
    }
)
.catch(()=>console.log("Kết nối thất bại!"))

