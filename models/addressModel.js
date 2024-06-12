const db = require('../config/database');

const Address = {
    create: (employeeId, address, callback) => {
        const query = 'INSERT INTO addresses (employee_id, address_line1, address_line2, city, state, zip_code) VALUES (?, ?, ?, ?, ?, ?)';
        db.query(query, [employeeId, address.address_line1, address.address_line2, address.city, address.state, address.zip_code], callback);
    },
    // findAllByEmployeeId: (employeeId, callback) => {
    //     db.query('SELECT * FROM addresses WHERE employee_id = ?', [employeeId], callback);
    // },
    findAll: ( callback) => {
        db.query('SELECT * FROM addresses ', callback);
    },
    findById: (id, callback) => {
        db.query('SELECT * FROM addresses WHERE id = ?', [id], callback);
    },
    update: (id, address, callback) => {
        const query = 'UPDATE addresses SET address_line1 = ?, address_line2 = ?, city = ?, state = ?, zip_code = ? WHERE id = ?';
        db.query(query, [address.address_line1, address.address_line2, address.city, address.state, address.zip_code, id], callback);
    },
    delete: (id, callback) => {
        db.query('DELETE FROM addresses WHERE id = ?', [id], callback);
    }
};

module.exports = Address;
