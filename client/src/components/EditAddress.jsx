import React, { useEffect, useState } from "react";
import { Form, Modal, Input, Button, message } from "antd";
import { EditOutlined } from '@ant-design/icons';
import axios from 'axios';

const EditEmployee = ({ employee_id }) => {
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState({
    address_line1: '',
    address_line2: '',
    city: '',
    state: '',
    zip_code: ''
  });

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/addresses/${employee_id}`);
      const addressData = response.data;
      
      setFormData(addressData)
    } catch (error) {
      console.log('Error fetching address:', error);
    }
  };

  const showModal = async () => {
    await fetchData();
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
console.log(formData)
 
  
  return (
    <>
      <Button type="primary" onClick={showModal} icon={<EditOutlined />} />
      <Modal
        title="Edit Address"
        visible={visible}

        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleSave}>
            Save
          </Button>,
        ]}
      >
        <Form layout="vertical" initialValues={formData || {}}>
          <Form.Item name="address_line1" label="Address Line 1">
            <Input
              value={formData.address_line2}
              onChange={(e) => handleChange('address_line1', e.target.value)}
            />
          </Form.Item>
          <Form.Item name="address_line2" label="Address Line 2">
            <Input
              value={formData.address_line2}
              onChange={(e) => handleChange('address_line2', e.target.value)}
            />
          </Form.Item>
          <Form.Item name="city" label="City">
            <Input
              value={formData.city}
              onChange={(e) => handleChange('city', e.target.value)}
            />
          </Form.Item>
          <Form.Item name="state" label="State">
            <Input
              value={formData.state}
              onChange={(e) => handleChange('state', e.target.value)}
            />
          </Form.Item>
          <Form.Item name="zip_code" label="Zip Code">
            <Input
              value={formData.zip_code}
              onChange={(e) => handleChange('zip_code', e.target.value)}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default EditEmployee;
