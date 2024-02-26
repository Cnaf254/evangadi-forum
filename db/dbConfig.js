const mysql2 = require('mysql2');

const dbConnection= mysql2.createPool({
    user:"sinaf@2014",
    database:"evangadi-forum-db",
    host:"localhost",
    password:"1492014@Cnaf",
    connectionLimit:10
});
// dbConnection.execute("select 'test' ",(err,result)=>{
//     if(err){
//         console.log(err.message)
//     }else{
//         console.log(result)
//     }
// })

module.exports = dbConnection.promise()