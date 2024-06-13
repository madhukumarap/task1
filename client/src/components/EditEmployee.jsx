import React, { useState } from "react";
import { Form, Modal, Input, Button, message } from "antd";
import { EditOutlined } from "@ant-design/icons";
import axios from "axios";

const EditEmployee = ({ employee_id }) => {
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    position: "",
  });

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/getoneemployeesbyid/${employee_id}`
      );
      const employeeData = response.data;
      console.log(employeeData)
      setFormData(employeeData);
    } catch (error) {
      console.log("Error fetching employee data:", error);
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
    axios
      .put(`http://localhost:8080/api/updateemployees/${employee_id}`, formData)
      .then((response) => {
        message.success("Employee details saved!");
        setVisible(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        message.error("Failed to save employee details");
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
// console.log(formData)
  return (
    <>
      <Button type="primary" onClick={showModal} icon={<EditOutlined />} />
      <Modal
        title="Edit Employee"
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
          <Form.Item  name="name" label="Name">
            <Input
              
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter the Name"
            />
          </Form.Item>
          <Form.Item  name="email" label="Email">
            <Input
             
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter the Email"
            />
          </Form.Item>
          <Form.Item  name="position" label="Position">
            <Input
             
              value={formData.position}
              onChange={handleChange}
              placeholder="Enter the Position"
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default EditEmployee;
