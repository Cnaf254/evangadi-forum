const dbConnection = require('../db/dbConfig')

async function postAnswer(req,res){
    const {userid,questionid,answer}=req.body;
    if(!questionid || !userid || !answer){
       return res.status(400).json({msg:"please provide all required fields"})
    }

 try {
 await dbConnection.query("INSERT INTO answers (userid,questionid,answer) VALUES (?,?,?)",[userid,questionid,answer])
 return res.status(201).json({msg:"answer posted"})
    
 } catch (error) {
    console.log(error.message)
    return res.status(500).json({msg:"something went wrong, try again later"})
 }

}
async function allAnswer(req,res){
    
    try {
  
     const [allanswer] = await dbConnection.query("SELECT userid,questionid,answer from answers where questionid='q01' ")
     return res.status(200).json({msg:"all answer retrieved succesfully",allanswer})
     
    } catch (error) {
     console.log(error.message)
     return res.status(500).json({msg:"something went wrong, try again later"})
    }
  
  }


module.exports = {postAnswer,allAnswer};