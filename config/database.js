const mysql = require('mysql')

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'employeecrud'
});
db.connect(err=>{
    if(err){
        console.error('Database connection failed:', err.stack);
        return
    }
    console.log("DataBase Connected Successfully")
})

module.exports = db