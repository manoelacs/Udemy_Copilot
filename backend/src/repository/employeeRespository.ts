import { dbConfigPool } from '../config/dbConfig';
import { Employee } from '../model/employee'; // Ensure this path is correct
import { Pool } from 'mysql2/promise';

/**
 * EmployeeRepository class handles all database operations related to employees.
 */
export class EmployeeRepository {
  /**
   * Creates an instance of EmployeeRepository.
   * Initializes the database connection pool.
   */
  private pool: Pool;

  constructor() {
    this.pool = dbConfigPool;
  }

  /**
   * Executes a database query with the provided query string and parameters.
   * @template T - The expected return type of the query result.
   * @param {string} query - The SQL query string.
   * @param {any[]} params - The parameters for the SQL query.
   * @returns {Promise<T>} - The result of the query.
   * @throws {Error} - Throws an error if the query fails.
   */
  private async queryDatabase<T>(query: string, params: any[]): Promise<T> {
    try {
      const [rows] = await this.pool.execute(query, params);
      return rows as T;
    } catch (error) {
      console.error('Database query error:', { query, params, error });
      throw new Error('Database query failed');
    }
  }

  /**
   * Retrieves all employees from the database.
   * @returns {Promise<Employee[]>} - A promise that resolves to an array of Employee objects.
   */
  public async getEmployees(): Promise<Employee[]> {
    const employees = await this.queryDatabase<Employee[]>(
      'SELECT * FROM employees',
      []
    );
    return employees;
  }

  /**
   * Retrieves an employee by their ID.
   * @param {string} id - The ID of the employee.
   * @returns {Promise<Employee | undefined>} - A promise that resolves to an Employee object or undefined if not found.
   */
  public async getEmployeeById(id: string): Promise<Employee | undefined> {
    const employees = await this.queryDatabase<Employee[]>(
      'SELECT * FROM employees WHERE id = ?',
      [id]
    );
    return employees.length ? employees[0] : undefined;
  }

  /**
   * Adds a new employee to the database.
   * @param {Partial<Employee>} employee - The employee data to be added.
   * @returns {Promise<{ insertId: number }>} - A promise that resolves to an object containing the insert ID of the new employee.
   */
  public async addEmployee(
    employee: Partial<Employee>
  ): Promise<{ insertId: number }> {
    const result = await this.queryDatabase<{ insertId: number }>(
      'INSERT INTO employees (first_name, last_name, hire_date, position, bio) VALUES (?, ?, ?, ?, ?)',
      [
        employee.firstName,
        employee.lastName,
        employee.hireDate,
        employee.position,
        employee.bio,
      ]
    );
    return { insertId: result.insertId };
  }

  /**
   * Deletes an employee from the database by their ID.
   * @param {string} id - The ID of the employee to be deleted.
   * @returns {Promise<void>} - A promise that resolves when the employee is deleted.
   */
  public async deleteEmployee(id: string): Promise<void> {
    await this.queryDatabase('DELETE FROM employees WHERE id = ?', [id]);
  }

  /**
   * Updates the position of an employee in the database.
   * @param {string} id - The ID of the employee.
   * @param {string} position - The new position of the employee.
   * @returns {Promise<number>} - A promise that resolves to the number of affected rows.
   */
  public async updateEmployeePosition(
    id: string,
    position: string
  ): Promise<number> {
    const result = await this.queryDatabase<{ affectedRows: number }>(
      'UPDATE employees SET position = ? WHERE id = ?',
      [position, id]
    );
    return result.affectedRows;
  }

  /**
   * Retrieves employees by their position.
   * @param {string} position - The position of the employees to be retrieved.
   * @returns {Promise<Employee[]>} - A promise that resolves to an array of Employee objects.
   */
  public async getEmployeesByPosition(position: string): Promise<Employee[]> {
    const employees = await this.queryDatabase<Employee[]>(
      'SELECT * FROM employees WHERE position = ?',
      [position]
    );
    return employees;
  }
}
