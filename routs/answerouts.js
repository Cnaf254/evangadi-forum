const express=require("express")
const router=express.Router()
const {post,get}=require("../controller/answerController.js")

router.post("/post",post)

router.get("/community_answer/:questionId", get);

;



module.exports=router