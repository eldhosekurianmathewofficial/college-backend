const express=require("express")
const cors=require("cors")
const mongoose=require("mongoose")
const data=require("./controllers/adminRouter")
const mark=require("./controllers/studentRouter")

const exp=express()
exp.use(express.json())
exp.use(cors())
mongoose.connect("mongodb+srv://eldhosekurianofficial:Jesusislove123@cluster0.ufrxpj4.mongodb.net/studentDB?retryWrites=true&w=majority",{
    useNewUrlParser:true
})
exp.use("/api/student",data)
exp.use("/api/mark",mark)

exp.listen(3002,()=>{
    console.log("Status Running")
})