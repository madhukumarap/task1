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
  const { page = 1, pageSize = 10 } = req.query;
  const offset = (page - 1) * pageSize;
  

  
  const pageNumber = parseInt(page, 10);
  const pageSizeNumber = parseInt(pageSize, 10);

  if (isNaN(pageNumber) || isNaN(pageSizeNumber)) {
    return res.status(400).send({ error: 'Invalid pagination parameters' });
  }
  console.log(page, offset);
  Employee.findAllPaginated(offset, pageSizeNumber, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    } else {
      Employee.count((err, count) => {
        if (err) {
          return res.status(500).send(err);
        } else {
          return res.status(200).send({ data: result, total: count });
        }
      });
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
