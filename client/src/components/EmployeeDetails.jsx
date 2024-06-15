import { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal, message } from 'antd';
import { EyeOutlined, DeleteOutlined } from '@ant-design/icons';

import AddAddress from './AddAddress';
import AddEmployees from './AddEmployees';
import EditAddress from './EditAddress';
import EditEmployee from './EditEmployee';

const EmployeeDetails = () => {
  const [employeeData, setEmployeeData] = useState([]);
  const [employeeAddress, setEmployeeAddress] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 5, total: 0 });

  useEffect(() => {
    fetchData(pagination.current, pagination.pageSize);
    fetchData1();
  }, []);

  const fetchData = async (page, pageSize) => {
    try {
      const response = await axios.get("http://localhost:8080/api/getemployees", {
        params: { page, pageSize },
      });
      setEmployeeData(response.data.data);
      setPagination({
        ...pagination,
        total: response.data.total,
      });
      console.log(response.data)
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData1 = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/employees/addresses");
      setEmployeeAddress(response.data);
      // console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleModalOpen = (employee_id) => {
    const employee = employeeData.find(emp => emp.id === employee_id);
    const address = employeeAddress.filter(addr => addr.employee_id === employee_id);
    setSelectedEmployee({ ...employee, addresses: address });
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setSelectedEmployee(null);
    setEditMode(false); // Reset edit mode when closing modal
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/deletemployees/${id}`);
      message.success('Employee deleted successfully');
      setEmployeeData(employeeData.filter(emp => emp.id !== id));
    } catch (error) {
      console.error('Error deleting employee:', error);
      message.error('Failed to delete employee');
    }
  };

  const handleDeleteAddress = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/deleteaddresses/${id}`);
      message.success('Address deleted successfully');

      const updatedAddresses = selectedEmployee.addresses.filter(addr => addr.id !== id);

      setSelectedEmployee({
        ...selectedEmployee,
        addresses: updatedAddresses,
      });
    } catch (error) {
      console.error('Error deleting address:', error);
      message.error('Failed to delete address');
    }
  };

  const handleEditAddress = (addressId) => {
    const selectedAddress = selectedEmployee.addresses.find(addr => addr.id === addressId);
    setSelectedEmployee({ ...selectedEmployee, selectedAddress });
    setEditMode(true);
  };

  const handleTableChange = (pagination) => {
    fetchData(pagination.current, pagination.pageSize);
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      filters: employeeData.map(employee => ({
        text: employee.name,
        value: employee.name,
      })),
      onFilter: (value, record) => record.name.includes(value),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: (a, b) => a.email.localeCompare(b.email),
      filters: employeeData.map(employee => ({
        text: employee.email,
        value: employee.email,
      })),
      onFilter: (value, record) => record.email.includes(value),
    },
    {
      title: 'Position',
      dataIndex: 'position',
      key: 'position',
      sorter: (a, b) => a.position.localeCompare(b.position),
      filters: employeeData.map(employee => ({
        text: employee.position,
        value: employee.position,
      })),
      onFilter: (value, record) => record.position.includes(value),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <div className='flex gap-2'>
          <Button icon={<EyeOutlined />} onClick={() => handleModalOpen(record.id)} />
          <Button icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)} />
          <EditEmployee employee_id={record.id} />
        </div>
      ),
    },
  ];

  const addressColumns = [
    {
      title: 'Address Line 1',
      dataIndex: 'address_line1',
      key: 'address_line1',
      sorter: (a, b) => a.address_line1.localeCompare(b.address_line1),
    },
    {
      title: 'Address Line 2',
      dataIndex: 'address_line2',
      key: 'address_line2',
      sorter: (a, b) => a.address_line2.localeCompare(b.address_line2),
    },
    {
      title: 'City',
      dataIndex: 'city',
      key: 'city',
      sorter: (a, b) => a.city.localeCompare(b.city),
    },
    {
      title: 'State',
      dataIndex: 'state',
      key: 'state',
      sorter: (a, b) => a.state.localeCompare(b.state),
    },
    {
      title: 'Zip Code',
      dataIndex: 'zip_code',
      key: 'zip_code',
      sorter: (a, b) => a.zip_code.localeCompare(b.zip_code),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <div className='flex gap-2'>
          <Button icon={<DeleteOutlined />} onClick={() => handleDeleteAddress(record.id)} />
          <EditAddress employee_id={record.id} />
        </div>
      ),
    },
  ];

  return (
    <div className="p-4">
      <div className='flex justify-between'>
        <h2 className="text-2xl font-bold mb-4">Employee List</h2>
        <AddEmployees />
      </div>
      <Table
        dataSource={employeeData}
        columns={columns}
        rowKey="id"
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
          showSizeChanger: true,
        }}
        onChange={handleTableChange}
      />

      <Modal
        title={editMode ? 'Edit Address' : 'Employee Details'}
        visible={modalVisible}
        onCancel={handleModalClose}
        footer={null}
        width={1000}
      >
        {editMode ? (
          <EditAddress employee_id={selectedEmployee.id} />
        ) : (
          <>
            {selectedEmployee && (
              <div>
                <h3 className="text-xl font-bold mb-2">{selectedEmployee.name}</h3>
                <p><strong>Email:</strong> {selectedEmployee.email}</p>
                <p><strong>Position:</strong> {selectedEmployee.position}</p>
                <div className='flex justify-between'>
                  <h4 className="text-lg font-bold mt-4">Addresses</h4>
                  <AddAddress employee_id={selectedEmployee.id} />
                </div>
                <Table
                  dataSource={selectedEmployee.addresses}
                  columns={addressColumns}
                  rowKey={(record) => record.id || record.address_line1}
                  pagination={false}
                />
              </div>
            )}
          </>
        )}
      </Modal>
    </div>
  );
};

export default EmployeeDetails;
