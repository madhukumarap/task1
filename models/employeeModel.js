const db = require('../config/database');

const Employee = {
  create: (employee, callback) => {
    const query = "INSERT INTO employees (name, email, position) VALUES (?, ?, ?)";
    db.query(query, [employee.name, employee.email, employee.position], callback);
  },

  findAll: (callback) => {
    db.query("SELECT * FROM employees", callback);
  },

  findAllPaginated: (offset, limit, callback) => {
    const query = "SELECT * FROM employees LIMIT ?, ?";
    db.query(query, [parseInt(offset, 10), parseInt(limit, 10)], callback);
  },

  count: (callback) => {
    const query = 'SELECT COUNT(*) AS count FROM employees';
    db.query(query, (err, results) => {
      if (err) {
        callback(err);
      } else {
        callback(null, results[0].count);
      }
    });
  },

  findById: (id, callback) => {
    const employeeQuery = "SELECT * FROM employees WHERE id = ?";
    const addressQuery = "SELECT * FROM addresses WHERE employee_id = ?";
    
    db.query(employeeQuery, [id], (err, employeeResult) => {
      if (err) {
        return callback(err, null);
      }

      db.query(addressQuery, [id], (err, addressResult) => {
        if (err) {
          return callback(err, null);
        }

        const result = {
          employee: employeeResult,
          address: addressResult,
        };

        callback(null, result);
      });
    });
  },

  findById1: (id, callback) => {
    const query = "SELECT * FROM employees WHERE id = ?";
    db.query(query, [id], (err, employeeResult) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, employeeResult);
    });
  },

  update: (id, employee, callback) => {
    const query = "UPDATE employees SET name = ?, email = ?, position = ? WHERE id = ?";
    db.query(query, [employee.name, employee.email, employee.position, id], callback);
  },

  delete: (id, callback) => {
    const query = "DELETE FROM employees WHERE id = ?";
    db.query(query, [id], callback);
  },
};

module.exports = Employee;
