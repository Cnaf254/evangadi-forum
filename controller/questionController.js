const dbConnection = require('../db/dbConfig')

async function postQuestion(req,res){
    const {questionid,userid,title,description,tag}=req.body;
    if(!questionid || !userid || !title || !description || !tag){
       return res.status(400).json({msg:"please provide all required fields"})
    }

 try {
 await dbConnection.query("INSERT INTO questions (questionid,userid,title,description,tag) VALUES (?,?,?,?,?)",[questionid,userid,title,description,tag])
 return res.status(201).json({msg:"question posted redirected to home"})
    
 } catch (error) {
    console.log(error.message)
    return res.status(500).json({msg:"something went wrong, try again later"})
 }

}
async function allQuestion(req,res){
    
    try {
  
     const [allquestion] = await dbConnection.query("SELECT questionid,userid,title,description from questions ")
     return res.status(200).json({msg:"all question retrieved succesfully",allquestion})
     
    } catch (error) {
     console.log(error.message)
     return res.status(500).json({msg:"something went wrong, try again later"})
    }
  
  }


module.exports = {postQuestion,allQuestion};