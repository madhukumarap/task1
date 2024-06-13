const express = require('express');
const mysql = require('mysql2/promise');

const app = express();
const PORT = 3000;
app.use(express.json());
const SHARED_DB_CONFIG = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'shared_db'
};

const tenantConnections = {};

async function getTenantConnection(tenantId) {
    if (tenantConnections[tenantId]) {
        return tenantConnections[tenantId];
    }

    const sharedConnection = await mysql.createConnection(SHARED_DB_CONFIG);
    const [rows] = await sharedConnection.execute('SELECT db_name FROM tenants WHERE id = ?', [tenantId]);
    await sharedConnection.end();

    if (rows.length === 0) {
        throw new Error('Tenant not found');
    }

    const tenantDbConfig = {
        host: 'localhost',
        user: 'root',
        password: '',
        database: rows[0].db_name
    };

    tenantConnections[tenantId] = await mysql.createConnection(tenantDbConfig);
    return tenantConnections[tenantId];
}

app.use(async (req, res, next) => {
    const tenantId = req.query.tenantId;
    if (!tenantId) {
        return res.status(400).send('Tenant ID required');
    }

    try {
        req.tenantConnection = await getTenantConnection(tenantId);
        next();
    } catch (error) {
        next(error);
    }
});

app.get('/data', async (req, res) => {
    const [rows] = await req.tenantConnection.execute('SELECT * FROM data');
    res.json(rows);
});
app.post('/tenantdata',async (req,res)=>{
    const {name, description } = req.body;
    if(!name || ! description){
        return res.status(400).send({error: 'Name and description are required'})
    }
    try {
        const [result] = await req.tenantConnection.execute('INSERT INTO data (name,description) VALUES (?,?) ',[name, description]);
        res.status(200).send({id:result.insertId, name, description})
    } catch (error) {
        console.error('Error inserting data:', error);
        res.status(500).json({ error: 'Failed to insert data' });
    }
})
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
