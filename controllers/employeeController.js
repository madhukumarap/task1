const Employee = require('../models/employeeModel');

const createEmployee = (req, res) => {
  const { name, email, position } = req.body;
  Employee.create({ name, email, position }, (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send({ id: result.insertId });
    }
  });
};

const getEmployees = (req, res) => {
  Employee.findAll((err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(result);
    }
  });
};

const getEmployeesById = (req, res) => {
  const { id } = req.params;
  Employee.findById(id, (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else if (result.length === 0) {
      res.status(404).send({ message: 'Employee not found' });
    } else {
      res.status(200).send(result);
    }
  });
};

const getEmployeesById1 = (req, res) => {
  const { id } = req.params;
  Employee.findById1(id, (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else if (result.length === 0) {
      res.status(404).send({ message: 'Employee not found' });
    } else {
      res.status(200).send(result);
    }
  });
};

const updateEmployee = (req, res) => {
  const { id } = req.params;
  const { name, email, position } = req.body;
  Employee.update(id, { name, email, position }, (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else if (result.affectedRows === 0) {
      res.status(404).send({ message: 'Employee not found' });
    } else {
      res.status(200).send({ message: 'Employee updated' });
    }
  });
};

const deleteEmployee = (req, res) => {
  const { id } = req.params;
  Employee.delete(id, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else if (results.affectedRows === 0) {
      res.status(404).send({ message: 'Employee not found' });
    } else {
      res.status(200).send({ message: 'Employee deleted' });
    }
  });
};

module.exports = {
  createEmployee,
  getEmployees,
  getEmployeesById,
  getEmployeesById1,
  updateEmployee,
  deleteEmployee,
};
