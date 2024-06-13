const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser')
const app = express()
app.use(cors());

const PORT = process.env.PORT || 8080;


const employeesRoutes = require('./routes/employeeRoutes');
const addressRoutes = require('./routes/addressRoutes');

app.use(bodyParser.json())


app.use('/api',employeesRoutes)
app.use('/api',addressRoutes)

app.listen(PORT,()=>{
    console.log(`The Server Running on port ${PORT}`)
})