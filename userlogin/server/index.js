const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2');
const cors = require('cors')
const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors())



const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'userregistration', 
  });
  
  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to the database:', err);
      return;
    }
    console.log('Connected to the MySQL database');
  });
// Secret key for JWT
const secretKey = 'abcd1234';


app.post('/register', async (req, res) => {
    const { mediaOutlet, name, jobTitle, webAddress, email, password } = req.body;
  
    if (!mediaOutlet || !name || !jobTitle || !webAddress || !email || !password) {
      return res.status(400).json({ msg: 'Please enter all fields' });
    }
  
    try {
     
      const hashedPassword = await bcrypt.hash(password, 10);
  
      
      const query = `
        INSERT INTO users (media_outlet, name, job_title, web_address, email, password)
        VALUES (?, ?, ?, ?, ?, ?)
      `;
      connection.query(query, [mediaOutlet, name, jobTitle, webAddress, email, hashedPassword], (err, result) => {
        if (err) {
          console.error('Error executing query:', err);
          res.status(500).json({ msg: 'An error occurred while registering the user' });
          return;
        }
        res.status(201).json({ msg: 'User registered successfully' });
      });
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ msg: 'An error occurred while registering the user' });
    }
  });
  
app.get('/user',(req,res)=>{
  const  {email} = req.query;
  if(!email){
    return res.status(400).json({ msg: 'Email is required' });
  }
  try {
    const query = 'SELECT media_outlet, name, job_title, web_address, email FROM users WHERE email=?'
    connection.query(query,[email],(err,result)=>{
      if(err){
        console.error('Error executing query:', err);
        res.status(500).json({ msg: 'An error occurred while fetching the user details' });
        return;
      }
      if(result.length === 0){
        return res.status(404).json({ msg: 'User not found' });
      }
      res.status(200).json(result[0])
    })
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ msg: 'An error occurred while fetching the user details' });
  }
})
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  connection.query('SELECT * FROM users WHERE email = ?', [email], async (err, result) => {
    if (err) throw err;
    if (result.length === 0) {
      return res.status(400).json({ msg: 'User does not exist' });
    }

    const user = result[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: '1h' });
    res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
