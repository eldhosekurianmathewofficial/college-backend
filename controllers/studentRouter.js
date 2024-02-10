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
router.get("/viewmark",async(req,res)=>{
    let data=await markData.find()
    .populate("userId","name rollno admsnno -_id")
    .exec()
    res.json(data)
})
module.exports=router