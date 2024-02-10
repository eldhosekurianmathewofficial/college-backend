const express=require("express")
const router=express.Router()
const studmodel=require("../models/studModel")
const bcryprt=require("bcryptjs")


HashGenerator=async(pass)=>{
    const salt=await bcryprt.genSalt(10)
    return bcryprt.hash(pass,salt)
}

router.post("/add",async(req,res)=>{
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


module.exports=router