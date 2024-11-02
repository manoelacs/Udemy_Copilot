import { Employee } from './src/model/employee';

export class InMemoryRepository {
  private employees: Employee[] = [];

  public async getEmployees(): Promise<Employee[]> {
    return this.employees;
  }

  public async getEmployeesById(id: string): Promise<Employee | undefined> {
    return this.employees.find((employee) => employee.id === id);
  }

  public async addEmployee(employee: Partial<Employee>) {
    const newEmployee: Employee = {
      id: this.employees.length + 1,
      ...employee,
    } as Employee;

    this.employees.push(newEmployee);

    return newEmployee;
  }

  public async removeEmployee(id: string): Promise<void> {
    this.employees = this.employees.filter((employee) => employee.id !== id);
  }

  public async updateEmployeePosition(id: string, position: string) {
    const employee = this.employees.find((employee) => employee.id === id);
    if (employee) {
      employee.position = position;
    }
  }

  public async deleteEmployees(id: string) {
    this.employees = this.employees.filter((employee) => employee.id !== id);
  }

  public async getEmployeeByPosition(position: string): Promise<Employee[]> {
    return this.employees.filter((employee) => employee.position === position);
  }
}
