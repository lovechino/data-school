const express = require("express")
const mongoose = require("mongoose")
const app = express()

app.listen(3000,()=>{
    console.log("ngu vch")
})

mongoose.connect("mongodb+srv://admin:achinchin2kx@cluster0.xelldvi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>console.log("da ket noi"))
.catch(()=>console.log("ket noi loi"))