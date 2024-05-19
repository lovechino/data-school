const express = require("express")
const mongoose = require("mongoose")
const studentAction = require("./Actions/Student.action")
const khoaAction = require("./Actions/Khoa.action")
const teacherAction = require("./Actions/Teacher.action")
const subjectAction = require("./Actions/Subject.action")
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use("/api/students",studentAction)
app.use("/api/khoa",khoaAction)
app.use("/api/teacher",teacherAction)
app.use("/api/subject",subjectAction)

mongoose.connect("mongodb+srv://admin:achinchin2kx@cluster0.xelldvi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(
    ()=>{
        app.listen(3000,()=>{
           console.log("Kết nối thành công")
        })
    }
)
.catch(()=>console.log("Kết nối thất bại!"))

