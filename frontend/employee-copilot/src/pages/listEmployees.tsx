import React from 'react';

import { useState, useEffect } from 'react';
import { getEmployees } from '../services/dataService';
import { Employee } from '../models/employee';
import { Link } from 'react-router-dom';
import { formatDate } from '../utils/dateFormat';

const ListEmployees: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await getEmployees();

        setEmployees(response);
      } catch (error) {
        console.error('Error fetching employees', error);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <div>
      <h1>Employee List</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Position</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.lastName}</td>
              <td>{formatDate(employee.hireDate)}</td>
              <td>
                <button
                  type='button'
                  style={{
                    backgroundColor: 'blue',
                    color: 'white',
                    borderRadius: '5px',
                    padding: '5px 10px',
                  }}>
                  <Link
                    to={`/employee/details/${employee.id}`}
                    style={{ color: 'white', textDecoration: 'none' }}>
                    details
                  </Link>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        type='button'
        style={{
          backgroundColor: 'blue',
          color: 'white',
          borderRadius: '5px',
          padding: '5px 10px',
        }}>
        <Link
          to={`/employee/add`}
          style={{ color: 'white', textDecoration: 'none' }}>
          Add Employee
        </Link>
      </button>
    </div>
  );
};

export default ListEmployees;
