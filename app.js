const express=require("express")
const app=express()
const cors=require("cors")
port=3003
require("dotenv").config();

app.use(cors())


//user route middleware file
const userRouter=require("./routs/userouts.js")

//question route middleware file

const questionRoute=require("./routs/questionrouts.js")

//answer route middleware file
const answerRoute=require("./routs/answerouts.js")

//importing db connection instance
const dbconnection=require("./db/dbconfig.js")
//Authentication middleware
const authMiddleware = require("./middleware/authMiddleware.js")

//json middleware to etract jason data
app.use(express.json())

//user routes middleware
app.use("/api/users",userRouter);

//question routes middleware
app.use("/api/question", authMiddleware, questionRoute);

//answer routes middleware

app.use("/api/answer",authMiddleware,answerRoute)






async function start(){
    try {
        const result=await dbconnection.execute("select 'test' ")
        console.log(result)
         await app.listen(port);
        console.log(`listening on ${port}`)
        
    } catch (error) {
        console.log(error)
        
    }
}
start()



