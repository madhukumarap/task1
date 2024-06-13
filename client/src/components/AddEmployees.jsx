import  { useState } from "react";
import { Form, Modal, Input, Button, message } from "antd";
import { EditOutlined } from '@ant-design/icons';
import axios from 'axios';

const AddEmployees = () => {
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    position: ''
  });

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleSave = () => {
    axios.post('http://localhost:8080/api/employees', formData)
      .then(response => {
        console.log('Success:', response.data);
        message.success('Employee details saved!');
        setVisible(false);
      })
      .catch(error => {
        console.error('Error:', error);
        message.error('Failed to save employee details');
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
        title="Add Employee"
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
        <Form layout="vertical">
          <Form.Item name="name" label="Name">
            <Input
              placeholder="Enter name"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
            />
          </Form.Item>
          <Form.Item name="email" label="Email">
            <Input
              placeholder="Enter Email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
            />
          </Form.Item>
          <Form.Item name="position" label="Position">
            <Input
              placeholder="Enter Position"
              value={formData.position}
              onChange={(e) => handleChange('position', e.target.value)}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddEmployees;
