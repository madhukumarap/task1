const Address = require('../models/addressModel');

const createAddress = (req, res) => {
    const { employeeId } = req.params;
    const { address_line1, address_line2, city, state, zip_code } = req.body;
    Address.create(employeeId, { address_line1, address_line2, city, state, zip_code }, (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send({ id: results.insertId });
        }
    });
};

const getAllAddressesByEmployeeId = (req, res) => {
    // const { employeeId } = req.params;
    Address.findAll( (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(results);
        }
    });
};

const getAddressById = (req, res) => {
    const { id } = req.params;
    Address.findById(id, (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else if (results.length === 0) {
            res.status(404).send({ message: 'Address not found' });
        } else {
            res.status(200).send(results[0]);
        }
    });
};

const updateAddress = (req, res) => {
    const { id } = req.params;
    const { address_line1, address_line2, city, state, zip_code } = req.body;
    Address.update(id, { address_line1, address_line2, city, state, zip_code }, (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else if (results.affectedRows === 0) {
            res.status(404).send({ message: 'Address not found' });
        } else {
            res.status(200).send({ message: 'Address updated' });
        }
    });
};

const deleteAddress = (req, res) => {
    const { id } = req.params;
    Address.delete(id, (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else if (results.affectedRows === 0) {
            res.status(404).send({ message: 'Address not found' });
        } else {
            res.status(200).send({ message: 'Address deleted' });
        }
    });
};

module.exports = {
    createAddress,
    getAllAddressesByEmployeeId,
    getAddressById,
    updateAddress,
    deleteAddress
};
