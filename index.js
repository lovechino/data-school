const express = require("express")
const mongoose = require("mongoose")
const cors = require('cors')
const dotenv = require('dotenv')
const studentAction = require("./Actions/Student.action")
const khoaAction = require("./Actions/Khoa.action")
const teacherAction = require("./Actions/Teacher.action")
const subjectAction = require("./Actions/Subject.action")
const scheduleAction = require('./Actions/Schedule.action')
const breakAction = require('./Actions/Break.action')
const userAction = require('./Actions/User.action')
const app = express()

dotenv.config()
const port = process.env.PORT;
const url = process.env.DATABASE_URL;

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors())

app.use("/api/students",studentAction)
app.use("/api/khoa",khoaAction)
app.use("/api/teacher",teacherAction)
app.use("/api/subject",subjectAction)
app.use("/api/schedule",scheduleAction)
app.use("/api/break",breakAction)
app.use("/api/user",userAction)

mongoose.connect(url)
.then(
    ()=>{
        app.listen(port,()=>{
           console.log("Kết nối thành công")
        })
    }
)
.catch(()=>console.log("Kết nối thất bại!"))

