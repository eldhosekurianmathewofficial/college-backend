const express=require("express")
const router=express.Router()
const markData=require("../models/markModel")

router.post("/add_mark",async(req,res)=>{
    let data=req.body
    let post=new markData(data)
    let result=await post.save()
    res.json({
        status:"success"
    })

})
router.post("/viewmymark",async(req,res)=>{
    let data=req.body
    let result=await markData.find(data)

    res.json(result)
})
module.exports=router