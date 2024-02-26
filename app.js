const express= require('express')
const app = express()
const port=5501
const userRoute = require("./routes/userRoute")
const questionRoute= require('./routes/questionRoute')
//authentication middleware
const authMiddleware= require('./middleware/authMiddleware')

 //db connection
 const dbConnection = require("./db/dbConfig")

 //json middleware to extract json data
app.use(express.json())


//user routes middleware
app.use("/api/users",userRoute)

//question route middleware
app.use("/api/questions",authMiddleware, questionRoute)

 async function start(){
  try {
    const result=await dbConnection.execute("select 'test'")
    app.listen(port)
     console.log("database connection established")
     console.log(`listening on ${port}`)
  } catch (error) {
    console.log(error.message)
  }
 }
 start()


