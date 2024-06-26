const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController')

router.post('/employees',employeeController.createEmployee);
router.get('/getemployees',employeeController.getEmployees);
router.get('/getemployeesbyid/:id',employeeController.getEmployeesById);
router.put('/updateemployees/:id',employeeController.updateEmployee)
router.delete('/deletemployees/:id',employeeController.deleteEmployee)
router.get('/getoneemployeesbyid/:id',employeeController.getEmployeesById1)
// getEmployeesById1
module.exports = router
