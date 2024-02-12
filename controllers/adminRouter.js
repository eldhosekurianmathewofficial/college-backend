const express=require("express")
const router=express.Router()
const studmodel=require("../models/studModel")
const bcryprt=require("bcryptjs")
const markData=require("../models/markModel")
const markModel = require("../models/markModel")

HashGenerator=async(pass)=>{
    const salt=await bcryprt.genSalt(10)
    return bcryprt.hash(pass,salt)
}

router.post("/addstudent",async(req,res)=>{
    let {data}={"data":req.body}
    let password=data.password

const hashedPassword=await HashGenerator(password)
data.password=hashedPassword
let load = new studmodel(data)

let result= load.save()
    res.json(
        {
        status:"success"
    })
})
router.post("/studentlogin",async(req,res)=>{
    let data=req.body
    let email=data.email
    let data1= await studmodel.findOne({"email":email})
    if(!data1)
    {
        return res.json({
            status:"Invalid email"
        })
    }
    else{
    let orgpass=data.password   
    let hashpass=data1.password
    const match=await bcryprt.compare(orgpass,hashpass)
    if(!match)
    {
        return res.json({
            status:"invalid password"
        })
    }
    else{
        res.json({
            status:"success","userdata":data1
        })
    }
}
})

router.get("/viewstudents",async(req,res)=>{
    let data=await studmodel.find()
    res.json(data)
})
router.get("/viewstudentswithmarks",async(req,res)=>{
    let data=await markModel.find()
    .populate("userId","name rollno admsnno ")
    res.json(data)
})
module.exports=router