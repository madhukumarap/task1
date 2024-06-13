const db = require('../config/database');

const Employee = {
  create: (employee, callback) => {
    const query =
      "INSERT INTO employees (name, email, position) VALUES (?, ?, ?)";
    db.query(
      query,
      [employee.name, employee.email, employee.position],
      callback
    );
  },

  findAll: (callback) => {
    db.query("SELECT * FROM employees", callback);
  },

  findById: (id, callback) => {
    db.query(
      "SELECT * FROM employees WHERE id = ?",
      [id],
      (err, employeeResult) => {
        if (err) {
          return callback(err, null);
        }

        db.query(
          "SELECT * FROM addresses WHERE employee_id = ?",
          [id],
          (err, addressResult) => {
            if (err) {
              return callback(err, null);
            }

            const result = {
              employee: employeeResult,
              address: addressResult,
            };

            callback(null, result);
          }
        );
      }
    );
  },

  update: (id, employee, callback) => {
    const query =
      "UPDATE employees SET name = ?, email = ?, position = ? WHERE id = ?";
    db.query(
      query,
      [employee.name, employee.email, employee.position, id],
      callback
    );
  },

  delete: (id, callback) => {
    db.query("DELETE FROM employees WHERE id = ?", [id], callback);
  },
};

module.exports = Employee;
