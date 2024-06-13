const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
const PORT = 5000;
const secretKey = 'abcd1234';

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'shared_db'
};

app.use(bodyParser.json());
app.use(cors());

// Middleware to authenticate and set req.userId and req.userRole from JWT
const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Access denied, token missing!' });
    }

    try {
        const decoded = jwt.verify(token, secretKey);
        req.userId = decoded.userId;
        req.userRole = decoded.role;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token!' });
    }
};

// Register endpoint
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const connection = await mysql.createConnection(dbConfig);
        await connection.execute('INSERT INTO users (username, password, role_id) VALUES (?, ?, 1)', [username, hashedPassword]);
        await connection.end();

        res.status(200).json({ message: 'User registration successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to register user' });
    }
});

// Login endpoint
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    console.log(req.body)
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute('SELECT * FROM users WHERE username = ?', [username]);
        await connection.end();

        if (rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        const user = rows[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        // Generating the JWT token
        const token = jwt.sign({ userId: user.id, role: user.role_id }, secretKey, { expiresIn: '1h' });
        console.log(token)
        res.json({ token });
        
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Failed to login' });
    }
});

// Profile endpoint
app.get('/profile', authenticateJWT, async (req, res) => {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute('SELECT username, role_id FROM users WHERE id = ?', [req.userId]);
    await connection.end();

    if (rows.length === 0) {
        return res.status(404).json({ error: 'User not found' });
    }

    res.json({ username: rows[0].username, role: rows[0].role_id });
});

// Admin endpoint to get all users
app.get('/admin/users', authenticateJWT, async (req, res) => {
    if (req.userRole !== 'admin') {
        return res.status(403).json({ error: 'Unauthorized' });
    }

    try {
        const connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute('SELECT id, username, role_id FROM users');
        await connection.end();

        res.json(rows);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
