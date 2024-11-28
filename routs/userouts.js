const express=require("express")
const router=express.Router()
const { register, logIn, checkUser }= require( "../controller/userController.js")
const authMiddleware=require("../middleware/authMiddleware.js")

router.post("/register", register);

router.post("/login", logIn);

router.get("/check",authMiddleware, checkUser)
module.exports=router

