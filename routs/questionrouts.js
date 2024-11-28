const express = require("express");
const router = express.Router();
const { StatusCodes } = require("http-status-codes");
const {post,allQuestions}=require("../controller/questionController.js")

router.post("/post",post);


router.get("/all_questions",allQuestions)



module.exports=router

