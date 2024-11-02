import { EmployeeRepository } from '../src/repository/employeeRespository';
import { Employee } from '../src/model/employee';

jest.mock('../src/config/dbConfig', () => ({
  dbConfigPool: {
    execute: jest.fn(),
  },
}));

const { dbConfigPool } = require('../src/config/dbConfig');

describe('EmployeeRepository', () => {
  let employeeRepository: EmployeeRepository;

  beforeEach(() => {
    employeeRepository = new EmployeeRepository();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should add an employee', async () => {
    const mockEmployee: Employee = {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      hireDate: new Date(),
      position: 'Developer',
      bio: 'Experienced developer',
    };

    dbConfigPool.execute.mockResolvedValueOnce([{ insertId: 1 }]);

    const result = await employeeRepository.addEmployee(mockEmployee);

    expect(result).toEqual({ insertId: 1 });
    expect(dbConfigPool.execute).toHaveBeenCalledWith(
      'INSERT INTO employees (first_name, last_name, hire_date, position, bio) VALUES (?, ?, ?, ?, ?)',
      [
        mockEmployee.firstName,
        mockEmployee.lastName,
        mockEmployee.hireDate,
        mockEmployee.position,
        mockEmployee.bio,
      ]
    );
  });

  it('should get all employees', async () => {
    const mockEmployees: Employee[] = [
      {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        hireDate: new Date(),
        position: 'Developer',
        bio: 'Experienced developer',
      },
      {
        id: '2',
        firstName: 'John',
        lastName: 'Doe',
        hireDate: new Date(),
        position: 'Developer',
        bio: 'Experienced developer',
      },
    ];

    dbConfigPool.execute.mockResolvedValueOnce([mockEmployees]);

    const result = await employeeRepository.getEmployees();

    expect(result).toEqual(mockEmployees);
    expect(dbConfigPool.execute).toHaveBeenCalledWith(
      'SELECT * FROM employees',
      []
    );
  });

  it('should delete an employee', async () => {
    const mockId = '1';

    dbConfigPool.execute.mockResolvedValueOnce([]);

    await employeeRepository.deleteEmployee(mockId);

    expect(dbConfigPool.execute).toHaveBeenCalledWith(
      'DELETE FROM employees WHERE id = ?',
      [mockId]
    );
  });

  it('should update an employee position', async () => {
    const mockId = '1';
    const mockPosition = 'Manager';

    dbConfigPool.execute.mockResolvedValueOnce([{ affectedRows: 1 }]);

    await employeeRepository.updateEmployeePosition(mockId, mockPosition);

    expect(dbConfigPool.execute).toHaveBeenCalledWith(
      'UPDATE employees SET position = ? WHERE id = ?',
      [mockPosition, mockId]
    );
  });

  it('should get employees by position', async () => {
    const mockPosition = 'Developer';
    const mockEmployees: Employee[] = [
      {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        hireDate: new Date(),
        position: 'Developer',
        bio: 'Experienced developer',
      },
      {
        id: '2',
        firstName: 'John',
        lastName: 'Doe',
        hireDate: new Date(),
        position: 'Developer',
        bio: 'Experienced developer',
      },
    ];

    dbConfigPool.execute.mockResolvedValueOnce([mockEmployees]);

    const result = await employeeRepository.getEmployeesByPosition(
      mockPosition
    );

    expect(result).toEqual(mockEmployees);
    expect(dbConfigPool.execute).toHaveBeenCalledWith(
      'SELECT * FROM employees WHERE position = ?',
      [mockPosition]
    );
  });

  it('should get an employee by ID', async () => {
    const mockId = '1';
    const mockEmployee: Employee = {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      hireDate: new Date(),
      position: 'Developer',
      bio: 'Experienced developer',
    };

    dbConfigPool.execute.mockResolvedValueOnce([[mockEmployee]]);

    const result = await employeeRepository.getEmployeeById(mockId);

    expect(result).toEqual(mockEmployee);
    expect(dbConfigPool.execute).toHaveBeenCalledWith(
      'SELECT * FROM employees WHERE id = ?',
      [mockId]
    );
  });

  it('should update an employee bio', async () => {
    const mockId = '1';
    const mockBio = 'New bio';

    dbConfigPool.execute.mockResolvedValueOnce([{ affectedRows: 1 }]);

    await employeeRepository.updateEmployeeBio(mockId, mockBio);

    expect(dbConfigPool.execute).toHaveBeenCalledWith(
      'UPDATE employees SET bio = ? WHERE id = ?',
      [mockBio, mockId]
    );
  });
});
