import { createPool, Pool } from 'mysql2/promise';
import { dbConfig } from '../config/dbConfig';
import { Employee } from '../model/employee';

export class EmployeeRepository {
  private connection: Pool;

  constructor() {
    this.connection = createPool(dbConfig);
  }

  private async queryDatabase<T>(query: string, params: any[]): Promise<T> {
    try {
      const [rows] = await this.connection.query(query, params);
      return rows as T;
    } catch (error) {
      console.error('Database query error:', error);
      throw new Error('Database query failed');
    }
  }

  public async getEmployees(): Promise<Employee[]> {
    const employees = await this.queryDatabase<Employee[]>(
      'SELECT * FROM employees',
      []
    );
    return employees;
  }

  public async getEmployeeById(id: string): Promise<Employee | undefined> {
    const employees = await this.queryDatabase<Employee[]>(
      'SELECT * FROM employees WHERE id = ?',
      [id]
    );
    return employees.length ? employees[0] : undefined;
  }

  public async addEmployee(employee: Partial<Employee>) {
    const result = await this.queryDatabase(
      'INSERT INTO employees (first_name, last_name, hire_date, position, bio) VALUES (?, ?, ?, ?, ?)',
      [
        employee.firstName,
        employee.lastName,
        employee.hireDate,
        employee.position,
        employee.bio,
      ]
    );
    return result;
  }

  public async removeEmployee(id: string): Promise<void> {
    await this.queryDatabase('DELETE FROM employees WHERE id = ?', [id]);
  }

  public async updateEmployeePosition(id: string, position: string) {
    const result = await this.queryDatabase(
      'UPDATE employees SET position = ? WHERE id = ?',
      [position, id]
    );
    return result;
  }

  public async deleteEmployee(id: string) {
    const result = await this.queryDatabase(
      'DELETE FROM employees WHERE id = ?',
      [id]
    );
    return result;
  }

  public async getEmployeesByPosition(position: string): Promise<Employee[]> {
    const employees = await this.queryDatabase<Employee[]>(
      'SELECT * FROM employees WHERE position = ?',
      [position]
    );
    return employees;
  }
}
