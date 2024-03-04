//db connection
const dbConnection = require('../db/dbConfig')
const bcrypt= require('bcrypt');
const jwt = require('jsonwebtoken')



async function register(req,res){
    const {username,firstname,lastname,email,password}=req.body;
    if(!username || !firstname || !lastname || !email || !password){
       return res.status(400).json({msg:"please provide all required fields"})
    }

 try {

    const [user]= await dbConnection.query("SELECT username,userid from users where username=? or email=? ",[username,email])
   if(user.length>0){
   return res.status(400).json({msg:"user already registered"})
   }
   if(password.length<=8){
   return res.status(400).json({msg:"password must be atleast 8 characters"})
   }

   //encrypt the password
   const salt= await bcrypt.genSalt(10)
   const hashedPassword= await bcrypt.hash(password,salt)


 await dbConnection.query("INSERT INTO users (username,firstname,lastname,email,password) VALUES (?,?,?,?,?)",[username,firstname,lastname,email,hashedPassword])
 return res.status(201).json({msg:"user created"})
    
 } catch (error) {
    console.log(error.message)
    return res.status(500).json({msg:"something went wrong, try again later"})
 }

}

async function login(req,res){
  const {email,password}=req.body
  if(!email || !password){
   return res.status(400).json({msg:"please enter all required fields"})
  }
  try {

   const [user] = await dbConnection.query("SELECT username,userid,password from users where email=?",[email])
   

   //check if the credential is valid
   if(user.length == 0){
      return res.status(400).json({error:"invalid credential"})
   }
   //compare password
   const isMatch =await bcrypt.compare(password,user[0].password);
   if(!isMatch){
      return res.status(400).json({error:"invalid credential"}) 
   }
   const username=user[0].username
   const userid=user[0].userid
   const token = jwt.sign({username,userid},process.env.JWT_SECRET,{expiresIn: "1d"})
   return res.status(200).json({msg:"user login successful", token,username})
   
  } catch (error) {
   console.log(error.message)
   return res.status(500).json({msg:"something went wrong, try again later"})
  }

}

async function check(req,res){
   const username=req.user.username 
   const userid=req.user.userid 
   res.status(200).json({msg:"valid user",username,userid})
}
module.exports = { register,login,check };