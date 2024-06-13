import  { useState } from "react";
import { Form, Modal, Input, Button, message } from "antd";
import { EditOutlined,DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';

const AddAddress = ({employee_id}) => {
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState({
    address_line1: '',
    address_line2: '',
    city: '',
    state:'',
    zip_code:''
  });

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleSave = () => {
    axios.post(`http://localhost:8080/api/employees/${employee_id}/addresses`, formData)
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
          <Form.Item name="address_line1" label="Address_Line1">
            <Input
              placeholder="Enter Addresss"
              value={formData.address_line1}
              onChange={(e) => handleChange('address_line1', e.target.value)}
            />
          </Form.Item>
          <Form.Item name="address_line2" label="Address_Line2">
            <Input
              placeholder="Enter Address"
              value={formData.address_line1}
              onChange={(e) => handleChange('address_line2', e.target.value)}
            />
          </Form.Item>
          <Form.Item name="city" label="City">
            <Input
              placeholder="Enter City"
              value={formData.position}
              onChange={(e) => handleChange('city', e.target.value)}
            />
          </Form.Item>
          <Form.Item name="state" label="State">
            <Input
              placeholder="Enter state"
              value={formData.state}
              onChange={(e) => handleChange('state', e.target.value)}
            />
          </Form.Item>
          <Form.Item name="zip_code" label="Zip_Code">
            <Input
              placeholder="Enter zip_code"
              value={formData.zip_code}
              onChange={(e) => handleChange('zip_code', e.target.value)}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddAddress;
