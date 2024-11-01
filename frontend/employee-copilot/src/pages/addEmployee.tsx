import React from 'react';

import { addEmployee } from '../services/dataService';

import { Employee } from '../models/employee';
import { formatDateToISO } from '../utils/dateFormat';
import { useNavigate } from 'react-router-dom';
const AddEmployee: React.FC = () => {
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [position, setPosition] = React.useState('');
  const [bio, setBio] = React.useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const newEmployee: Partial<Employee> = {
      firstName,
      lastName,
      position,
      hireDate: formatDateToISO(),
      bio,
    };

    addEmployee(newEmployee).then(
      () => {
        console.log('Employee added');

        navigate('/employee/list');
      },
      (err) => {
        console.error('Error adding employee', err);
      }
    );

    setFirstName('');
    setLastName('');
    setPosition('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        maxWidth: '400px',
        margin: 'auto',
      }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          textAlign: 'left',
        }}>
        <label>First Name: </label>
        <input
          type='text'
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          style={{
            padding: '0.5rem',
            borderRadius: '4px',
            border: '1px solid #ccc',
          }}
        />
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          textAlign: 'left',
        }}>
        <label>Last Name: </label>
        <input
          type='text'
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          style={{
            padding: '0.5rem',
            borderRadius: '4px',
            border: '1px solid #ccc',
          }}
        />
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          textAlign: 'left',
        }}>
        <label>Position: </label>
        <input
          type='text'
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          style={{
            padding: '0.5rem',
            borderRadius: '4px',
            border: '1px solid #ccc',
          }}
        />
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          textAlign: 'left',
        }}>
        <label>Bio: </label>
        <textarea
          id='w3review'
          name='w3review'
          rows={4}
          cols={50}
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          style={{
            padding: '0.5rem',
            borderRadius: '4px',
            border: '1px solid #ccc',
          }}
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button
          type='submit'
          style={{
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            border: 'none',
            backgroundColor: '#007bff',
            color: '#fff',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = '#0056b3')
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = '#007bff')
          }>
          Add Employee
        </button>
        <button
          type='button'
          onClick={() => navigate('/employee/list')}
          style={{
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            border: 'none',
            backgroundColor: '#6c757d',
            color: '#fff',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = '#5a6268')
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = '#6c757d')
          }>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AddEmployee;
