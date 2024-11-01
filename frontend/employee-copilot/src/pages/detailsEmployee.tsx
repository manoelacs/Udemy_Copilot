import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getEmployee } from '../services/dataService';
import { Employee } from '../models/employee';
import { formatDate } from '../utils/dateFormat';

const DetailsEmployee: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [employee, setEmployee] = useState<Employee | null>(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      if (id) {
        const employeeData = await getEmployee(id);

        if (employeeData) {
          setEmployee(employeeData);
        }
      }
    };

    fetchEmployee();
  }, [id]);

  if (!employee) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <p>
        <strong>First Name:</strong> {employee.firstName}
      </p>

      <p>
        <strong>Last Name:</strong> {employee.lastName}
      </p>

      <p>
        <strong>Role:</strong> {employee.position}
      </p>

      <p>
        <strong>Hire Date:</strong> {formatDate(employee.hireDate)}
      </p>

      <p style={{ marginTop: '20px', lineHeight: '1.6' }}>{employee.bio}</p>

      <Link to={`/employee/list`}>
        <button
          style={{
            display: 'inline-block',
            marginTop: '20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            cursor: 'pointer',
            borderRadius: '5px',
            textDecoration: 'none',
            fontFamily: 'Arial, sans-serif',
            fontSize: '16px',
            transition: 'background-color 0.3s ease',
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor = '#0056b3')
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = '#007bff')
          }>
          Return to list
        </button>
      </Link>
    </div>
  );
};

export default DetailsEmployee;
