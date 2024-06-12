const express = require('express');
const router = express.Router();
const addressController = require('../controllers/addressController');

router.post('/employees/:employeeId/addresses', addressController.createAddress);
router.get('/employees/addresses', addressController.getAllAddressesByEmployeeId);
router.get('/addresses/:id', addressController.getAddressById);
router.put('/addresses/:id', addressController.updateAddress);
router.delete('/deleteaddresses/:id', addressController.deleteAddress);

module.exports = router;
