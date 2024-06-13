import React, { useEffect, useState } from "react";
import { Form, Modal, Input, Button, message } from "antd";
import { EditOutlined } from '@ant-design/icons';
import axios from 'axios';

const EditAddress = ({ employee_id }) => {
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState({
    address_line1: '',
    address_line2: '',
    city: '',
    state: '',
    zip_code: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/addresses/${employee_id}`);
      const addressData = response.data;

      // Update formData state with fetched data
      setFormData({
        address_line1: addressData.address_line1,
        address_line2: addressData.address_line2,
        city: addressData.city,
        state: addressData.state,
        zip_code: addressData.zip_code
      });
    } catch (error) {
      console.log('Error fetching address:', error);
    }
  };

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleSave = () => {
    axios.put(`http://localhost:8080/api/addresses/${employee_id}`, formData)
      .then(response => {
        console.log('Success:', response.data);
        message.success('Address details saved!');
        setVisible(false);
      })
      .catch(error => {
        console.error('Error:', error);
        message.error('Failed to save address details');
      });
  };

  const handleChange = (fieldName, value) => {
    setFormData({
      ...formData,
      [fieldName]: value
    });
  };

  return (
    <>
      <Button type="primary" onClick={showModal} icon={<EditOutlined />} />
      <Modal
        title="Edit Address"
        visible={visible}
        onCancel={handleCancel}
        initialValues={formData||{}}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleSave}>
            Save
          </Button>,
        ]}
      >
        <Form layout="vertical">
          <Form.Item name="address_line1" label="Address Line 1">
            <Input
              placeholder="Enter Address Line 1"
              value={formData.address_line1}
              onChange={(e) => handleChange('address_line1', e.target.value)}
            />
          </Form.Item>
          <Form.Item name="address_line2" label="Address Line 2">
            <Input
              placeholder="Enter Address Line 2"
              value={formData.address_line2}
              onChange={(e) => handleChange('address_line2', e.target.value)}
            />
          </Form.Item>
          <Form.Item name="city" label="City">
            <Input
              placeholder="Enter City"
              value={formData.city}
              onChange={(e) => handleChange('city', e.target.value)}
            />
          </Form.Item>
          <Form.Item name="state" label="State">
            <Input
              placeholder="Enter State"
              value={formData.state}
              onChange={(e) => handleChange('state', e.target.value)}
            />
          </Form.Item>
          <Form.Item name="zip_code" label="Zip Code">
            <Input
              placeholder="Enter Zip Code"
              value={formData.zip_code}
              onChange={(e) => handleChange('zip_code', e.target.value)}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default EditAddress;
